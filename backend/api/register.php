<?php
    require_once '../config/db.php';
    require_once '../utils/hash_chain.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    function clean($value) {
        return htmlspecialchars(strip_tags(trim($value)));
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $role = strtolower(trim($input['role'] ?? ''));

    // Role check
    if (!in_array($role, ['farmer', 'buyer'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid role specified.']);
        exit;
    }

    // Required fields
    $commonFields = ['first_name', 'last_name', 'phone', 'pin', 'code'];
    $required = $role === 'farmer'
        ? array_merge($commonFields, ['address'])
        : $commonFields;

    // Validate required
    foreach ($required as $field) {
        if (!isset($input[$field]) || trim($input[$field]) === '') {
            http_response_code(400);
            echo json_encode(['error' => ucfirst(str_replace('_', ' ', $field)) . ' is required.']);
            exit;
        }
    }

    // Sanitize
    $firstName   = clean($input['first_name']);
    $middleName  = clean($input['middle_name'] ?? ''); 
    $lastName    = clean($input['last_name']);
    $address     = $role === 'farmer' ? clean($input['address']) : null;
    $phone       = preg_replace('/[^0-9]/', '', $input['phone']);
    $pinRaw      = trim($input['pin']);
    $code        = trim($input['code']);

    // Code verification 
    $expectedCode = '123456';
    if ($code !== $expectedCode) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid verification code.']);
        exit;
    }

    // Phone and PIN validation
    if (!preg_match('/^09\d{9}$/', $phone)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid phone number. Must start with 09 and be 11 digits.']);
        exit;
    }
    if (strlen($pinRaw) < 4 || strlen($pinRaw) > 6) {
        http_response_code(400);
        echo json_encode(['error' => 'PIN must be between 4 and 6 digits.']);
        exit;
    }

    // Generate hash
    $hashedPin = password_hash($pinRaw, PASSWORD_BCRYPT);
    $dataForHash = [
        'first_name' => $firstName,
        'middle_name' => $middleName,
        'last_name' => $lastName,
        'phone' => $phone
    ];
    if ($role === 'farmer') {
        $dataForHash['address'] = $address;
    }
    $prevHash = '';
    $hash = generateHash($dataForHash, $prevHash);

    // Insert into the correct table
    try {
        if ($role === 'farmer') {
            $stmt = $pdo->prepare("INSERT INTO farmers (first_name, middle_name, last_name, address, phone, pin, hash)
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$firstName, $middleName, $lastName, $address, $phone, $hashedPin, $hash]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO buyers (first_name, middle_name, last_name, phone, pin, hash)
                                VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$firstName, $middleName, $lastName, $phone, $hashedPin, $hash]);
        }

        echo json_encode(['message' => ucfirst($role) . ' registered successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
?>
