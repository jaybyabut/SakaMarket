<?php
// --- CORS AND CONTENT-TYPE HEADERS ---
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// --- DATABASE CONNECTION ---
require 'database.php';

// --- HANDLE PRE-FLIGHT OPTIONS REQUEST ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- READ JSON INPUT ---
$data = json_decode(file_get_contents("php://input"), true);

// --- VALIDATE REQUIRED FIELDS ---
if (!isset($data['user_id']) || !isset($data['otp'])) {
    echo json_encode(["success" => false, "message" => "Missing user_id or otp"]);
    exit;
}

// --- SANITIZE INPUT ---
$user_id = filter_var($data['user_id'], FILTER_SANITIZE_NUMBER_INT);
$otp     = filter_var($data['otp'], FILTER_SANITIZE_STRING);

// --- FETCH OTP DATA FROM pending_verifications ---
$sql = "SELECT phone_temp, otp_code, otp_expiry 
        FROM pending_verifications
        WHERE user_id = $1";
$result = pg_query_params($conn, $sql, [$user_id]);

if (!$result || pg_num_rows($result) === 0) {
    echo json_encode(["success" => false, "message" => "No OTP request found"]);
    exit;
}

$row = pg_fetch_assoc($result);

// --- VALIDATE OTP ---
if ($row['otp_code'] === null || $row['otp_expiry'] === null) {
    echo json_encode(["success" => false, "message" => "No active OTP. Request again."]);
    exit;
}

if ($row['otp_code'] !== $otp) {
    echo json_encode(["success" => false, "message" => "Invalid OTP"]);
    exit;
}

if (strtotime($row['otp_expiry']) < time()) {
    echo json_encode(["success" => false, "message" => "OTP expired"]);
    exit;
}

// --- UPDATE USER PHONE ---
$update = "UPDATE users 
           SET phone = $1
           WHERE id = $2";
$done = pg_query_params($conn, $update, [$row['phone_temp'], $user_id]);

if (!$done) {
    echo json_encode(["success" => false, "message" => "Failed to update phone"]);
    exit;
}

// --- CLEANUP: DELETE VERIFICATION ROW ---
pg_query_params($conn, "DELETE FROM pending_verifications WHERE user_id = $1", [$user_id]);

// --- SUCCESS RESPONSE ---
echo json_encode([
    "success" => true,
    "message" => "Phone verified & updated",
    "user_id" => $user_id,
    "phone"   => $row['phone_temp']
]);
?>
