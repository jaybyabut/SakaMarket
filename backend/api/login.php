<?php
    require_once '../config/db.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    $input = json_decode(file_get_contents("php://input"), true);

    $phone = $input['phone'] ?? '';
    $pin = $input['pin'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM farmers WHERE phone = ?");
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if ($user && password_verify($pin, $user['pin'])) {
    echo json_encode(['message' => 'Login success', 'user_id' => $user['id']]);
    } else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    }
?>