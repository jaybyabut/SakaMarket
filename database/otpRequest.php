<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 0);

// --- DB CONNECTION ---
require 'database.php';

file_put_contents('otp_log.txt', date('Y-m-d H:i:s') . " RAW INPUT: " . file_get_contents("php://input") . "\n", FILE_APPEND);

// --- READ INPUT JSON ---
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON body"]);
    exit;
}

// --- EXTRACT FIELDS ---
$phone   = trim($data["phone"] ?? "");
$pin     = trim($data["pin"] ?? "");

// --- VALIDATION ---
if ($phone === "") {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// --- CHECK IF PHONE ALREADY EXISTS (final verified phone, not temp) ---
$check = pg_query_params($conn, "SELECT id FROM users WHERE phone = $1", [$phone]);
if (!$check) {
    echo json_encode(["success" => false, "message" => "Database query failed: " . pg_last_error($conn)]);
    exit;
}
if (pg_num_rows($check) > 0) {
    echo json_encode(["success" => false, "message" => "Phone already registered"]);
    exit;
}

// --- GENERATE OTP ---
$otp = strval(rand(100000, 999999));
$expiry = date("Y-m-d H:i:s", strtotime("+5 minutes"));

// --- HASH PIN ---
$hashedPin = password_hash($pin, PASSWORD_BCRYPT);

// --- INSERT USER (phone is NULL until verified) ---
$userResult = pg_query_params(
    $conn,
    "INSERT INTO users (role, phone, pin)
     VALUES ('farmer', NULL, $1) RETURNING id",
    [$hashedPin]
);

if (!$userResult) {
    echo json_encode(["success" => false, "message" => "Failed to insert user: " . pg_last_error($conn)]);
    exit;
}

// --- FETCH NEW USER ID ---
$userRow = pg_fetch_assoc($userResult);
$user_id = (int)$userRow['id'];

// --- INSERT OR UPDATE INTO PHONE VERIFICATIONS ---
$otpResult = pg_query_params(
    $conn,
    "INSERT INTO pending_verifications (user_id, phone_temp, otp_code, otp_expiry)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id)
     DO UPDATE SET phone_temp = EXCLUDED.phone_temp,
                   otp_code   = EXCLUDED.otp_code,
                   otp_expiry = EXCLUDED.otp_expiry,
                   created_at = CURRENT_TIMESTAMP
     RETURNING id",
    [$user_id, $phone, $otp, $expiry]
);

if (!$otpResult) {
    echo json_encode(["success" => false, "message" => "Failed to insert/update OTP: " . pg_last_error($conn)]);
    exit;
}
$otpRow = pg_fetch_assoc($otpResult);
error_log("OTP INSERT RESULT: " . print_r($otpRow, true));

// --- RETURN RESPONSE ---
echo json_encode([
    "success" => true,
    "message" => "OTP generated",
    "otp" => $otp,      // for testing only; remove in production
    "user_id" => $user_id
]);
exit;