<?php
require_once 'database.php';
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// --- CORS & headers ---
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Read input ---
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['phone']) || !isset($input['pin'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing phone or pin']);
    exit;
}

$phone = trim($input['phone']);
$pin   = trim($input['pin']);

// --- Validate phone ---
if (!preg_match('/^09\d{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid phone number format']);
    exit;
}

// --- Fetch user ---
// IMPORTANT: update if your column names are different!
$sql = "SELECT user_id, pin, role, phone 
        FROM users 
        WHERE phone = $1 
        LIMIT 1";

$result = pg_query_params($conn, $sql, [$phone]);

if (!$result || pg_num_rows($result) === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Walang account na may ganyang numero.']);
    exit;
}

$user = pg_fetch_assoc($result);

// --- Verify PIN ---
if (!password_verify($pin, $user['pin'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error'   => 'Wrong password.'
    ]);
    exit;
}

// --- Build & sign JWT ---
$jwtSecret = getenv('JWT_SECRET') ?: 'CHANGE_ME_DEV_SECRET';

$now = time();
$exp = $now + 60 * 60 * 24 * 7; // 7 days

$payload = [
    'iss'  => 'SakaMarketAPI',
    'aud'  => 'SakaMarketMobile',
    'iat'  => $now,
    'nbf'  => $now,
    'exp'  => $exp,
    'sub'  => $user['user_id'],   // now using user_id
    'role' => $user['role']
];

$token = JWT::encode($payload, $jwtSecret, 'HS256');

// --- Respond ---
http_response_code(200);
echo json_encode([
    'success'    => true,
    'token'      => $token,
    'expires_at' => $exp,
    'user'       => [
        'user_id' => $user['user_id'],
        'role'    => $user['role'],
        'phone'   => $user['phone']
    ]
]);
