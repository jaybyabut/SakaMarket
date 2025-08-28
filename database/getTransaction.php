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
$params = ["%" . $product . "%"];

switch ($filter) {
    case 'today':
        $whereClause .= " AND transaction_time::date = CURRENT_DATE";
        break;
    case 'week':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '7 days'";
        break;
    case 'month':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '1 month'";
        break;
    case '6months':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '6 months'";
        break;
    case 'year':
        $whereClause .= " AND transaction_time >= NOW() - INTERVAL '1 year'";
        break;
    case 'lifetime':
    default:
        break;
}

try {
    $query = "
        SELECT 
            product_id, 
            name,
            price, 
            amount, 
            -- ✅ return ISO8601 timestamp
            to_char(transaction_time AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') as transaction_time
        FROM ledger
        $whereClause
        ORDER BY transaction_time DESC
        LIMIT 50
    ";

    $result = pg_query_params($conn, $query, $params);

    if (!$result) {
        echo json_encode(["status" => "error", "message" => "Query failed"]);
        exit;
    }

    $transactions = [];
    while ($row = pg_fetch_assoc($result)) {
        $transactions[] = [
            "product_id"       => $row['product_id'],
            "name"             => $row['name'],
            "price"            => floatval($row['price']),
            "amount"           => intval($row['amount']),
            "transaction_time" => $row['transaction_time'] // now ISO8601
        ];
    }

    echo json_encode(["status" => "success", "data" => $transactions]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
