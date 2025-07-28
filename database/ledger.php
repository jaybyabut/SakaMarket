<?php
include 'database.php'; // Your database connection

function getLastLedgerHash($conn) {
    $sql = "SELECT current_hash FROM ledger ORDER BY ledger_id DESC LIMIT 1";
    $result = pg_query($conn, $sql);
    if ($row = pg_fetch_assoc($result)) {
        return $row['current_hash'];
    }
    return null;
}

function addToLedger($conn, $productId, $name, $price, $amount) {
    $previousHash = getLastLedgerHash($conn);
    $transactionTime = date('Y-m-d H:i:s');
    $dataToHash = $productId . $name . $price . $amount . $transactionTime . $previousHash;
    $currentHash = hash('sha256', $dataToHash);

    $sql = "INSERT INTO ledger (product_id, name, price, amount, transaction_time, previous_hash, current_hash)
            VALUES ($1, $2, $3, $4, $5, $6, $7)";
    $result = pg_query_params($conn, $sql, array($productId, $name, $price, $amount, $transactionTime, $previousHash, $currentHash));

    return $result;
}


function buyProduct($conn, $productId) {
    // 1. Get product details
    $sql = "SELECT * FROM selling_table WHERE id = $1";
    $result = pg_query_params($conn, $sql, array($productId));
    $product = pg_fetch_assoc($result);

    if ($product) {
        // 2. Delete from selling_table immediately
        pg_query_params($conn, "DELETE FROM selling_table WHERE id = $1", array($productId));

        // 3. Add to ledger (entire amount is sold)
        addToLedger($conn, $productId, $product['name'], $product['price'], $product['amount']);

        return ["success" => true, "message" => "Purchase successful and recorded in ledger"];
    } else {
        return ["success" => false, "message" => "Item not found"];
    }
}




function validateLedger($conn) {
    $sql = "SELECT * FROM ledger ORDER BY ledger_id ASC";
    $result = pg_query($conn, $sql);

    while ($row = pg_fetch_assoc($result)) {
        $dataToHash = $row['product_id'] . $row['name'] . $row['price'] . $row['amount'] . $row['transaction_time'] . $row['previous_hash'];
        $calculatedHash = hash('sha256', $dataToHash);

        if ($calculatedHash !== $row['current_hash']) {
            return ["success" => false, "message" => "Ledger integrity compromised at ID " . $row['ledger_id']];
        }
    }
    return ["success" => true, "message" => "Ledger is intact"];
}
?>
