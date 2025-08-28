<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'ledger.php'; // Contains approvePending function and DB connection

try {
    $conn = pg_connect("host=localhost port=5432 dbname=sakamarket_db user=postgres password=2121");

    $data = json_decode(file_get_contents("php://input"), true);
    $pendingId = $data['pending_id'] ?? null;

    if (!$pendingId) {
        echo json_encode(["success" => false, "error" => "Missing pending_id"]);
        exit;
    }

    $result = approvePending($conn, $pendingId);

    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
