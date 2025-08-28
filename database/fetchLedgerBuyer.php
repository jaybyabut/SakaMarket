<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $conn = pg_connect("host=localhost port=5432 dbname=sakamarket_db user=postgres password=2121");

    // Get buyer_id from query parameter
    $buyer_id = $_GET['buyer_id'] ?? null;

    if (!$buyer_id) {
        echo json_encode(["success" => false, "error" => "Missing buyer_id"]);
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
            u.first_name || ' ' || u.last_name AS seller_name
        FROM ledger l
        JOIN users u ON l.seller_id::uuid = u.user_id
        WHERE l.buyer_id = $1
        ORDER BY l.transaction_time DESC
    ";

    $result = pg_query_params($conn, $sql, array($buyer_id));

    $ledgerItems = [];
    while ($row = pg_fetch_assoc($result)) {
        $ledgerItems[] = $row;
    }

    echo json_encode(["success" => true, "data" => $ledgerItems]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
