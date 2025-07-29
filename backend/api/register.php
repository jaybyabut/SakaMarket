<?php
    require_once '../config/db.php';
    require_once '../utils/hash_chain.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    function clean($value) {
        return htmlspecialchars(strip_tags(trim($value)));
    }

    $input = json_decode(file_get_contents("php://input"), true);

    $required = ['first_name', 'middle_name', 'last_name', 'address', 'phone', 'pin', 'code'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || trim($input[$field]) === '') {
            http_response_code(400);
            echo json_encode(['error' => ucfirst(str_replace('_', ' ', $field)) . " is required"]);
            exit;
        }
    }

    // Sanitize
    $firstName   = clean($input['first_name']);
    $middleName  = clean($input['middle_name']);
    $lastName    = clean($input['last_name']);
    $address     = clean($input['address']);
    $phone       = preg_replace('/[^0-9]/', '', $input['phone']);
    $pinRaw      = trim($input['pin']);
    $code        = trim($input['code']); // 👈 Added

    // Check code
    $expectedCode = '123456'; // ✅ Change this to your logic (SMS, DB, session etc.)

    if ($code !== $expectedCode) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid verification code.']);
        exit;
    }

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

    $hashedPin = password_hash($pinRaw, PASSWORD_BCRYPT);
    $dataForHash = [
        'first_name' => $firstName,
        'middle_name' => $middleName,
        'last_name' => $lastName,
        'address' => $address,
        'phone' => $phone,
    ];
    $prevHash = ''; // Optional chaining
    $hash = generateHash($dataForHash, $prevHash);

    // Save to DB
    try {
        $stmt = $pdo->prepare("INSERT INTO farmers (first_name, middle_name, last_name, address, phone, pin, hash)
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$firstName, $middleName, $lastName, $address, $phone, $hashedPin, $hash]);

        echo json_encode(['message' => 'Farmer registered successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
?>
