<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // base URL for images
    $baseUrl = "http://192.168.100.6/sakamarket/database/uploads/";

    $sql = "SELECT s.id, 
                s.name, 
                s.price, 
                s.amount, 
                s.description, 
                s.image,
                (u.first_name || ' ' || u.last_name) AS seller_name,
                u.address AS seller_address
            FROM selling_table s
            JOIN users u ON s.user_id = u.user_id
            ORDER BY s.id DESC";

    $stmt = $conn->query($sql);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($products)) {
        foreach ($products as &$p) {
            if (!empty($p['image'])) {
                $p['image'] = $baseUrl . $p['image']; // prepend full URL
            }
        }
        echo json_encode($products);
    } else {
        echo json_encode(["debug" => "No rows found in selling_table"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>