<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    file_put_contents("debug.log", print_r($data, true));

    if (!isset($data['product_id'], $data['buyer_id'])) {
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    $conn->beginTransaction();

    // Fetch product and seller info
    $sql = "SELECT s.id, s.user_id AS seller_id, s.name, s.price, s.amount, s.description, s.image, u.address AS seller_address
            FROM selling_table s
            JOIN users u ON s.user_id = u.user_id
            WHERE s.id = :product_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':product_id' => $data['product_id']]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(["error" => "Product not found"]);
        exit;
    }

    // Make sure buyer_id and seller_id are UUID strings
    $buyer_id = $data['buyer_id'];
    $seller_id = $product['seller_id'];

    // Insert into pending_table
    $insert = "INSERT INTO pending_table
        (product_id, buyer_id, seller_id, delivery_address, name, price, amount, description, image)
        VALUES (:product_id, :buyer_id, :seller_id, :delivery_address, :name, :price, :amount, :description, :image)";
    $stmt = $conn->prepare($insert);

    if (!$stmt->execute([
        ':product_id' => $product['id'],
        ':buyer_id' => $buyer_id,
        ':seller_id' => $seller_id,
        ':delivery_address' => $product['seller_address'],
        ':name' => $product['name'],
        ':price' => $product['price'],
        ':amount' => $product['amount'],
        ':description' => $product['description'],
        ':image' => $product['image']
    ])) {
        $errorInfo = $stmt->errorInfo();
        throw new Exception("Insert failed: " . implode(", ", $errorInfo));
    }

    // Delete from selling_table AFTER successful insert
    $delete = $conn->prepare("DELETE FROM selling_table WHERE id = :id");
    $delete->execute([':id' => $product['id']]);

    $conn->commit();

    echo json_encode(["success" => true, "message" => "Product moved to pending table"]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    echo json_encode(["error" => $e->getMessage()]);
}
?>
