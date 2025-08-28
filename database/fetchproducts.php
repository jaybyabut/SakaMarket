<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // join selling_table with users to get seller info
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

    if (empty($products)) {
        echo json_encode(["debug" => "No rows found in selling_table"]);
    } else {
        echo json_encode($products);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
