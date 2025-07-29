<?php
    $host = 'localhost';
    $db = 'starter_db';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "pgsql:host=$host;dbname=$db";

    try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    } catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
    }
?>