<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'database.php';
include 'ledger.php';

echo json_encode(validateLedger($conn));
?>
