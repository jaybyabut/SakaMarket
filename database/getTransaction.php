<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include 'database.php';

$filter = $_GET['filter'] ?? 'lifetime'; 
$product = $_GET['product'] ?? null;

if (!$product) {
    echo json_encode(["status" => "error", "message" => "Product parameter is required"]);
    exit;
}

$whereClause = "WHERE name ILIKE $1";
$params = [$product];

switch ($filter) {
    case 'week':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '7 days'";
        break;
    case 'month':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '1 month'";
        break;
    case '6months':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '6 months'";
        break;
    case 'lifetime':
    default:
        // no time filter
        break;
}

try {
    $query = "
        SELECT 
            product_id, 
            name,
            price, 
            amount, 
            to_char(transaction_time, 'YYYY-MM-DD HH24:MI:SS') as transaction_time
        FROM ledger
        $whereClause
        ORDER BY transaction_time ASC
        LIMIT 20
    ";

    $result = pg_query_params($conn, $query, $params);

    if (!$result) {
        echo json_encode(["status" => "error", "message" => "Query failed"]);
        exit;
    }

    $transactions = [];
    while ($row = pg_fetch_assoc($result)) {
        $transactions[] = [
            "product_id" => $row['product_id'],
            "name"       => $row['name'],
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