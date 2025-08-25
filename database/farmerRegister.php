<?php
require_once 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$uploadDir = __DIR__ . "/uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

function clean($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}

function saveImage($fileKey, $uploadDir) {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }
    $fileTmp = $_FILES[$fileKey]["tmp_name"];
    $fileName = basename($_FILES[$fileKey]["name"]);
    $targetPath = $uploadDir . uniqid() . "_" . $fileName;
    if (move_uploaded_file($fileTmp, $targetPath)) {
        return $targetPath;
    }
    return null;
}

// --- Validate required fields ---
$required = ['first_name', 'last_name', 'phone', 'pin', 'address', 'user_id'];
foreach ($required as $field) {
    if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => ucfirst(str_replace('_', ' ', $field)) . ' is required.']);
        exit;
    }
}

$firstName  = clean($_POST['first_name']);
$middleName = clean($_POST['middle_name'] ?? '');
$lastName   = clean($_POST['last_name']);
$address    = clean($_POST['address']);
$phone      = preg_replace('/[^0-9]/', '', $_POST['phone']);
$pinRaw     = trim($_POST['pin']);
$userId     = (int)$_POST['user_id'];

if (!preg_match('/^09\d{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid phone number. Must start with 09 and be 11 digits.']);
    exit;
}
if (strlen($pinRaw) < 4 || strlen($pinRaw) > 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'PIN must be between 4 and 6 digits.']);
    exit;
}
$hashedPin = password_hash($pinRaw, PASSWORD_BCRYPT);

// --- Handle file uploads ---
$selfie   = saveImage("selfie", $uploadDir);
$govID    = saveImage("gov_id", $uploadDir);
$farmDoc  = saveImage("farm_doc", $uploadDir);

if (!$selfie || !$govID || !$farmDoc) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All three images (selfie, government ID, and farm document) are required.']);
    exit;
}

// --- Insert into database using pg_query_params ---
$sql = "
    UPDATE users
    SET 
        role = $1,
        first_name = $2,
        middle_name = $3,
        last_name = $4,
        address = $5,
        pin = $6,
        selfie_path = $7,
        gov_id_path = $8,
        farm_doc_path = $9
    WHERE id = $10
    RETURNING id
";

$params = [
    'farmer',
    $firstName,
    $middleName,
    $lastName,
    $address,
    $hashedPin,
    $selfie,
    $govID,
    $farmDoc,
    $userId
];

$result = pg_query_params($conn, $sql, $params);

if (!$result || pg_affected_rows($result) === 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'error' => 'No user found with that user_id to update.'
    ]);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Farmer registered successfully']);
?>
