<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get buyer_id from query parameter
    $buyer_id = $_GET['buyer_id'] ?? null;

    if (!$buyer_id) {
        echo json_encode(["success" => false, "error" => "Missing buyer_id"]);
        exit;
    }

    $sql = "
        SELECT 
            p.pending_id,
            p.product_id AS id,
            p.image,
            p.name,
            p.price,
            p.amount,
            p.delivery_address,
            p.created_at AS date,
            u.first_name || ' ' || u.last_name AS seller_name
        FROM pending_table p
        LEFT JOIN users u ON p.seller_id = u.user_id
        WHERE p.buyer_id = :buyer_id
        ORDER BY p.created_at DESC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute([':buyer_id' => $buyer_id]);
    $pendingItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $pendingItems]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
