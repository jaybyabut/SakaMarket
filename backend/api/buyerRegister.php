<?php
require_once 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

function clean($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}

$input = json_decode(file_get_contents("php://input"), true);

// Required fields for buyers
$required = ['first_name', 'last_name', 'phone', 'pin', 'code'];
foreach ($required as $field) {
    if (!isset($input[$field]) || trim($input[$field]) === '') {
        http_response_code(400);
        echo json_encode(['error' => ucfirst(str_replace('_', ' ', $field)) . ' is required.']);
        exit;
    }
}

$firstName   = clean($input['first_name']);
$middleName  = clean($input['middle_name'] ?? '');
$lastName    = clean($input['last_name']);
$phone       = preg_replace('/[^0-9]/', '', $input['phone']);
$pinRaw      = trim($input['pin']);
$code        = trim($input['code']);

if ($code !== '123456') {
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

// Insert buyer
try {
    $stmt = $pdo->prepare("
        INSERT INTO users (role, first_name, middle_name, last_name, phone, pin)
        VALUES ('buyer', ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$firstName, $middleName, $lastName, $phone, $hashedPin]);
    echo json_encode(['message' => 'Buyer registered successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
