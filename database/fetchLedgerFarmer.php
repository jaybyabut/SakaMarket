<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = pg_connect("host=localhost port=5432 dbname=sakamarket_db user=postgres password=2121");

    // Get buyer_id from query parameter
    $seller_id = $_GET['seller_id'] ?? null;

    if (!$seller_id) {
        echo json_encode(["success" => false, "error" => "Missing seller_id"]);
        exit;
    }

    // Fetch from ledger and join with users to get seller_name
    $sql = "
        SELECT 
            l.ledger_id AS pending_id,  -- keep pending_id field for frontend compatibility
            l.product_id AS id,
            l.name,
            l.price,
            l.amount,
            l.transaction_time AS date,
            l.delivery_address,
            u.first_name || ' ' || u.last_name AS buyer_name
        FROM ledger l
        JOIN users u ON l.buyer_id::uuid = u.user_id
        WHERE l.seller_id = $1
        ORDER BY l.transaction_time DESC
    ";

    $result = pg_query_params($conn, $sql, array($seller_id));

    $ledgerItems = [];
    while ($row = pg_fetch_assoc($result)) {
        $ledgerItems[] = $row;
    }

    echo json_encode(["success" => true, "data" => $ledgerItems]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
