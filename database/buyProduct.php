<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'database.php';
include 'ledger.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$productId = intval($data['product_id']);

$result = buyProduct($conn, $productId);

// ✅ DEBUGGING
if (!is_array($result) || !isset($result['success'])) {
    echo json_encode([
        "success" => false,
        "message" => "Backend returned no result"
    ]);
    exit();
}

if (!$result['success']) {
    echo json_encode([
        "success" => false,
        "message" => $result['message'] ?? "Unknown backend error"
    ]);
    exit();
}

echo json_encode(["success" => true, "message" => "Transaction completed"]);
?>
