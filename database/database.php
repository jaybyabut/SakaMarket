<?php
$host = "localhost";
$port = "5432";
$dbname = "sakamarket_db";
$user = "postgres";
$password = "2121";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}
?>
