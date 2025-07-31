<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include 'database.php';  

try {
    $query = "
        SELECT 
            product_id, 
            price, 
            amount, 
            to_char(transaction_time, 'YYYY-MM-DD HH24:MI:SS') as transaction_time
        FROM ledger 
        ORDER BY transaction_time ASC 
        LIMIT 20
    ";
    $result = pg_query($conn, $query);

    if (!$result) {
        echo json_encode(["status" => "error", "message" => "Query failed"]);
        exit;
    }

    $transactions = [];
    while ($row = pg_fetch_assoc($result)) {
        $transactions[] = [
            "product_id" => $row['product_id'],
            "price"      => floatval($row['price']),
            "amount"     => intval($row['amount']),
            "transaction_time" => $row['transaction_time']
        ];
    }

    echo json_encode(["status" => "success", "data" => $transactions]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
