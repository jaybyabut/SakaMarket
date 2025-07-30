<?php
    require_once '../config/db.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST");

    $input = json_decode(file_get_contents("php://input"), true);

    $phone = preg_replace('/[^0-9]/', '', $input['phone'] ?? '');
    $pin = trim($input['pin'] ?? '');
    $role = trim($input['role'] ?? ''); // Expected: 'farmer' or 'buyer'

    // Check for missing fields
    if (!$phone || !$pin || !$role) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Phone, PIN, and role are required.'
        ]);
        exit;
    }

    // Choose the correct table based on role
    $table = $role === 'farmer' ? 'farmers' : ($role === 'buyer' ? 'buyers' : null);

    if (!$table) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid role specified.'
        ]);
        exit;
    }

    // Check credentials in the chosen table
    $stmt = $pdo->prepare("SELECT * FROM {$table} WHERE phone = ?");
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if ($user && password_verify($pin, $user['pin'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Login success',
            'user_id' => $user['id'],
            'role' => $role
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid credentials'
        ]);
    }
?>
