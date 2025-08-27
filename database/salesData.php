<?php
// salesData.php

require_once 'salesDataSource.php';

use SalesDataSource\DataProvider;

header('Content-Type: application/json');

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

$pattern = '/^\/salesData\.php\/([^\/]+)$/';

if ($requestMethod === 'GET' && preg_match($pattern, $requestUri, $matches)) {
    $product = strtolower($matches[1]);
    $salesData = (new DataProvider())->getData();

    $filtered = array_filter($salesData, fn($entry) =>
        strtolower($entry['product']) === $product
    );

    if (empty($filtered)) {
        http_response_code(404);
        echo json_encode(['message' => "No sales data found for \"{$product}\""]);
        exit;
    }

    $quantities = array_column($filtered, 'quantity');
    $prices = array_column($filtered, 'price');

    $stats = [
        'product' => $product,
        'mostSold' => max($quantities),
        'leastSold' => min($quantities),
        'highestPrice' => max($prices),
        'lowestPrice' => min($prices),
        'averagePrice' => round(array_sum($prices) / count($prices)),
        'recentPrice' => reset($prices)
    ];

    echo json_encode($stats);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}