<?php
// PHP file to return JSON of tutor data
$tutors = [
    [
        "name" => "Zenny Goh",
        "subjects" => "LOL101, HEH202, POO303",
        "qualifications" => "LOL101 A+, HEH202 A, POO303 A",
        "fees" => "$40/h",
        "reviews" => "99+ Reviews and Ratings →",
        "image" => "photos/zenny.jpg",
        "rating" => 2
    ],
    [
        "name" => "Ananya Lim",
        "subjects" => "LMAO123, SING675, WAD1000",
        "qualifications" => "LMAO123 A+, SING675 A, WAD1000 A",
        "fees" => "$50/h",
        "reviews" => "37 Reviews and Ratings →",
        "image" => "photos/ananya.png",
        "rating" => 4
    ],
    [
        "name" => "Lai Bing Bing",
        "subjects" => "HELLO987, PLAY476, LIE234",
        "qualifications" => "HELLO987 A+, PLAY476 A, LIE234 A",
        "fees" => "$44/h",
        "reviews" => "+99 Reviews and Ratings →",
        "image" => "photos/bingbing.png",
        "rating" => 5
    ],
    [
        "name" => "Nick Loh",
        "subjects" => "PRO435, ACCT546, DANCE657",
        "qualifications" => "PRO435 A+, ACCT546 A, DANCE657 A",
        "fees" => "$30/h",
        "reviews" => "40 Reviews and Ratings →",
        "image" => "photos/nick.png",
        "rating" => 3
    ],
    [
        "name" => "Britney Koh",
        "subjects" => "SLEEP101, BZA202, ECON303",
        "qualifications" => "SLEEP101 A+, BZA202 A, ECON303 A",
        "fees" => "$70/h",
        "reviews" => "10 Reviews and Ratings →",
        "image" => "photos/britney.png",
        "rating" => 4
    ],
    [
        "name" => "Buck Tan",
        "subjects" => "KOR101, JAP202, ENG123",
        "qualifications" => "KOR101 A+, JAP202 A, ENG123 A",
        "fees" => "$28/h",
        "reviews" => "19 Reviews and Ratings →",
        "image" => "photos/buck.png",
        "rating" => 3
    ],
];

header('Content-Type: application/json');
echo json_encode($tutors);
?>
