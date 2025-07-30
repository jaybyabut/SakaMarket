<?php
require_once 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Read input
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['phone']) || !isset($input['pin'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing phone or pin']);
    exit;
}

$phone = trim($input['phone']);
$pin   = trim($input['pin']);

// Validate phone format (optional)
if (!preg_match('/^09\d{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid phone number format']);
    exit;
}

// Fetch user by phone
$sql = "SELECT id, pin, role FROM users WHERE phone = $1 LIMIT 1";
$result = pg_query_params($conn, $sql, [$phone]);

if (!$result || pg_num_rows($result) === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Walang account na may ganyang numero.']);
    exit;
}

$user = pg_fetch_assoc($result);

// Verify PIN
if (!password_verify($pin, $user['pin'])) {
    echo json_encode([
        'success' => false,
        'error'   => 'Wrong password.'
    ]);
    exit;
}

// Respond with role
echo json_encode([
    'success' => true,
    'role'    => $user['role'],
    'user_id' => $user['id']
]);
?>
