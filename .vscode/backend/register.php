<?php
header("Access-Control-Allow-Origin: *"); // For development/testing only
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Ensure it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Check if 'action' is set and is 'next'
    if (isset($_POST['action']) && $_POST['action'] === 'next') {

        // Sanitize and validate input
        $firstName = filter_input(INPUT_POST, "nameFirst", FILTER_SANITIZE_SPECIAL_CHARS);
        $middleName = filter_input(INPUT_POST, "nameMiddle", FILTER_SANITIZE_SPECIAL_CHARS);
        $lastName = filter_input(INPUT_POST, "nameLast", FILTER_SANITIZE_SPECIAL_CHARS);
        $farmAddress = filter_input(INPUT_POST, "address", FILTER_SANITIZE_SPECIAL_CHARS);
        $contactNumber = filter_input(INPUT_POST, "number", FILTER_SANITIZE_NUMBER_INT);
        $verifCode = filter_input(INPUT_POST, "verify", FILTER_SANITIZE_NUMBER_INT);
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';

        // Optional: check required fields
        if (!$firstName || !$lastName || !$password) {
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields.'
            ]);
            exit;
        }

        // Optional: confirm passwords match
        if ($password !== $confirmPassword) {
            echo json_encode([
                'success' => false,
                'message' => 'PIN and confirmation do not match.'
            ]);
            exit;
        }

        // Success!
        echo json_encode([
            'success' => true,
            'message' => 'Data received successfully.',
            'data' => [
                'firstName' => $firstName,
                'middleName' => $middleName,
                'lastName' => $lastName,
                'farmAddress' => $farmAddress,
                'contactNumber' => $contactNumber,
                'verificationCode' => $verifCode,
            ]
        ]);
        exit;

    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid or missing action.'
        ]);
        exit;
    }

} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
    exit;
}
?>
