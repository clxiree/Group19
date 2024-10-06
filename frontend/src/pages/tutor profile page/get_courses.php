<?php
// Simulate course data (no SQL, just hardcoded)
$course_data = [
    "IS216",
    "IS212",
    "IS213",
    "IS214",
    "IS215",
    "IS217",
    "IS218",
    "IS219",
    "IS210"
];

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($course_data);
?>
