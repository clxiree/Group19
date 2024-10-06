<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Define the path to the bookings.json file
$file_loc = 'bookings.json';
$bookings = json_decode(file_get_contents($file_loc), true);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Return all bookings in JSON format
        echo json_encode($bookings);
        break;

    case 'POST':
        // Get the input from the request body
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        // Validate the data
        if (!isset($data->tutorName, $data->subject, $data->status, $data->date, $data->location)) {
            http_response_code(400); // Bad request
            echo json_encode(['message' => 'Invalid booking data']);
            exit;
        }

        // Create a new booking entry
        $newBooking = [
            'tutorName' => $data->tutorName,
            'subject' => $data->subject,
            'status' => $data->status,
            'date' => $data->date,
            'location' => $data->location
        ];

        // Add the new booking to the array
        $bookings[] = $newBooking;

        // Save the updated bookings back to the JSON file
        if (file_put_contents($file_loc, json_encode($bookings, JSON_PRETTY_PRINT))) {
            echo json_encode(['message' => 'Booking added successfully']);
        } else {
            http_response_code(500); // Internal server error
            echo json_encode(['message' => 'Failed to save the booking']);
        }
        break;

    case 'OPTIONS':
        // Handle CORS pre-flight requests
        http_response_code(200);
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}
?>