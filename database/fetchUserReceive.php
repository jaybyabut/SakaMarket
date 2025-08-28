<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    // --- Connect DB ---
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- Get JWT from headers ---
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Missing Authorization header"]);
        exit;
    }

    $authHeader = $headers['Authorization'];
    if (strpos($authHeader, 'Bearer ') !== 0) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid Authorization format"]);
        exit;
    }

    $jwt = substr($authHeader, 7); // remove "Bearer "
    $jwtSecret = getenv('JWT_SECRET') ?: 'CHANGE_ME_DEV_SECRET';

    // --- Decode token ---
    $decoded = JWT::decode($jwt, new Key($jwtSecret, 'HS256'));
    $user_id = $decoded->sub; // from login.php payload

    // --- Fetch only this user's products ---
    $sql = "SELECT s.id, s.name, s.price, s.amount, s.description
            FROM selling_table s
            JOIN transactions t ON s.id = t.product_id
            WHERE t.user_id = :user_id
            ORDER BY s.id DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($products)) {
        echo json_encode(["debug" => "No transactions for this user"]);
    } else {
        echo json_encode($products);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
