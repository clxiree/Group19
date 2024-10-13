<?php
// PHP file to serve reviews as JSON

$reviews = [
    [
        "tutor_image" => "photos/zenny.jpg",
        "tutor_name" => "Zenny Goh",
        "reviews" => [
            [
                "reviewer_image" => "photos/april.png",
                "reviewer_name" => "Claire Ng",
                "subject" => "LOL101",
                "review_date" => "01/01/2024",
                "rating" => 2,
                "comment" => "This tutor is so impatient and makes me want to cry."
            ],
            [
                "reviewer_image" => "photos/bob.png",
                "reviewer_name" => "Soh Zi Wei",
                "subject" => "LOL101",
                "review_date" => "02/05/2024",
                "rating" => 5,
                "comment" => "This tutor is so handsum."
            ]
        ]
            ],

        [
            "tutor_image" => "photos/ananya.jpg",
                "tutor_name" => "Ananya Lim",
                "reviews" => [
                    [
                        "reviewer_image" => "photos/brandon.png",
                        "reviewer_name" => "Brandon Ng",
                        "subject" => "LOL101",
                        "review_date" => "01/01/2024",
                        "rating" => 5,
                        "comment" => "This tutor is so good at teaching, I got A+."
                    ],
                    [
                        "reviewer_image" => "photos/doug.png",
                        "reviewer_name" => "Doug Ong",
                        "subject" => "LOL101",
                        "review_date" => "02/05/2024",
                        "rating" => 3,
                        "comment" => "She buys food for us"
                    ]
                ]
            ]



];

// Send JSON response
header('Content-Type: application/json');
echo json_encode($reviews);
?>
