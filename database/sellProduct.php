<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO selling_table (name, price, description, amount, image)
            VALUES (:name, :price, :description, :amount, :image)";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':name' => $data->name,
        ':price' => $data->price,
        ':description' => $data->description,
        ':amount' => $data->amount,
        ':image' => $data->image
    ]);

    echo json_encode(["message" => "Product created."]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
