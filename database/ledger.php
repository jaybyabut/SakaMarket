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
    $insertResult = pg_query_params($conn, $sql, array($productId, $name, $price, $amount, $transactionTime, $previousHash, $currentHash));

    if (!$insertResult) {
        return ["success" => false, "message" => "Failed to insert into ledger."];
    }

    // Validate ledger integrity after insert
    $validationResult = validateLedger($conn);

    if (!$validationResult['success']) {
        return ["success" => false, "message" => $validationResult['message']];
    }

    return ["success" => true, "message" => "Transaction recorded successfully."];
}

function buyProduct($conn, $productId) {
    $sql = "SELECT * FROM selling_table WHERE id = $1";
    $result = pg_query_params($conn, $sql, array($productId));
    $product = pg_fetch_assoc($result);

    if (!$product) {
        return ["success" => false, "message" => "Item not found"];
    }

    // Delete from selling_table
    $deleteResult = pg_query_params($conn, "DELETE FROM selling_table WHERE id = $1", array($productId));
    if (!$deleteResult) {
        return ["success" => false, "message" => "Failed to delete from selling table."];
    }

    // Add to ledger and validate immediately
    $ledgerResult = addToLedger($conn, $productId, $product['name'], $product['price'], $product['amount']);
    if (!$ledgerResult['success']) {
        return $ledgerResult; // <-- STOP if validation failed
    }

    return ["success" => true, "message" => "Purchase successful and ledger is intact."];
}


function validateLedger($conn) {
    $sql = "SELECT * FROM ledger ORDER BY ledger_id ASC";
    $result = pg_query($conn, $sql);

    $previousHash = null;
    while ($row = pg_fetch_assoc($result)) {
        // Recalculate this row's hash
        $dataToHash = $row['product_id'] . $row['name'] . $row['price'] . $row['amount'] . $row['transaction_time'] . $row['previous_hash'];
        $calculatedHash = hash('sha256', $dataToHash);

        // Check if current_hash is correct
        if ($calculatedHash !== $row['current_hash']) {
            return ["success" => false, "message" => "Ledger integrity compromised at ID " . $row['ledger_id']];
        }

        // Check if previous_hash matches the actual previous row's hash
        if ($previousHash !== null && $row['previous_hash'] !== $previousHash) {
            return ["success" => false, "message" => "Ledger linkage broken at ID " . $row['ledger_id']];
        }

        $previousHash = $row['current_hash'];
    }

    return ["success" => true, "message" => "Ledger is intact"];
}
?>
