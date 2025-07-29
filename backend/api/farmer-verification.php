<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$uploadDir = "uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

function saveImage($fileKey, $uploadDir) {
    if (!isset($_FILES[$fileKey])) {
        return false;
    }

    $fileTmp = $_FILES[$fileKey]["tmp_name"];
    $fileName = basename($_FILES[$fileKey]["name"]);
    $targetPath = $uploadDir . uniqid() . "_" . $fileName;

    if (move_uploaded_file($fileTmp, $targetPath)) {
        return $targetPath;
    }

    return false;
}

$selfie = saveImage("selfie", $uploadDir);
$govID = saveImage("gov_id", $uploadDir);
$farmDoc = saveImage("farm_doc", $uploadDir);

if ($selfie && $govID && $farmDoc) {
    // You could store file paths in a database here if needed
    echo "success";
} else {
    http_response_code(400);
    echo "error: missing or invalid file(s)";
}
