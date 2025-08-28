<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=sakamarket_db", "postgres", "2121");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // fetch address of the user
    $userSql = "SELECT address FROM users WHERE user_id = :user_id LIMIT 1";
    $userStmt = $conn->prepare($userSql);
    $userStmt->execute([":user_id" => $data->user_id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    // prepare insert
    $sql = "INSERT INTO selling_table (name, price, description, amount, image, user_id, address)
            VALUES (:name, :price, :description, :amount, :image, :user_id, :address)";

    $stmt = $conn->prepare($sql);

    $imageData = !empty($data->image) ? base64_decode($data->image) : null;

    $success = $stmt->execute([
        ':name' => $data->name,
        ':price' => $data->price,
        ':description' => $data->description,
        ':amount' => $data->amount,
        ':image' => $imageData,
        ':user_id' => $data->user_id,
        ':address' => $user['address']
    ]);

    if ($success) {
        echo json_encode([
            "success" => true,
            "message" => "Product created and stored."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "Insert failed",
            "debug" => $stmt->errorInfo()
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
