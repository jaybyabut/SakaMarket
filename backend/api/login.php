<?php
    require_once '../config/db.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    $input = json_decode(file_get_contents("php://input"), true);

    $phone = preg_replace('/[^0-9]/', '', $input['phone'] ?? '');
    $pin = trim($input['pin'] ?? '');

    // Check for empty inputs
    if (!$phone || !$pin) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Phone and PIN are required.'
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM farmers WHERE phone = ?");
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if ($user && password_verify($pin, $user['pin'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Login success',
            'user_id' => $user['id']
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid credentials'
        ]);
    }
?>
