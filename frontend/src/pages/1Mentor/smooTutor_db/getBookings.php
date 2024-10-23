<?php

require_once 'common.php';
$dao = new BookingsDAO();
$bookings = $dao->getAll(); // Get an Indexed Array of Booking objects

$items = [];
foreach( $bookings as $booking_object ) {
    $item = [];
    $item["id"] = $booking_object->getID();
    $item["coursename"] = $booking_object->getCourseName();
    $item["coursecode"] = $booking_object->getCourseCode();
    $item["status"] = $booking_object->getStatus();
    $item["dateoflesson"] = $booking_object->getDateOfLesson();
    $item["mode"] = $booking_object->getMode();
    $item["picture"] = $booking_object->getPicture();
    $item["price"] = $booking_object->getPrice();
    $items[] = $item;
}

// Make bookings into JSON and return JSON data
$bookingsJSON = json_encode($items);
echo $bookingsJSON;

?>