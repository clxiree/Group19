<?php
// get_particulars.php
require_once 'common.php'; // Assuming this file includes necessary configurations and class files

// Hardcoded user ID for testing purposes (replace with dynamic user authentication later)
$user_id = 1; // Change this to the user ID you want to test with

$dao = new ParticularsDAO($pdo); // Assuming $pdo is the PDO object from common.php
$particulars = $dao->getParticularsByUserID($user_id);

if ($particulars) {
    // Preparing the particulars data as an associative array
    $item = [
        'user_id' => $particulars->getUserID(),
        'username' => $particulars->getUsername(),
        'tutor' => $particulars->getTutor(),
        'tutee' => $particulars->getTutee(),
        'teaching_code' => $particulars->getTeachingCode(),
        'taught_code' => $particulars->getTaughtCode(),
        'number_of_reviews' => $particulars->getNumberOfReviews(),
        'one_liner' => $particulars->getOneLiner(),
        'about' => $particulars->getAbout(),
        'tutor_rating' => $particulars->getTutorRating(),
        'tutee_rating' => $particulars->getTuteeRating(),
        'qualifications' => $particulars->getQualifications(),
        'rate' => $particulars->getRate(),
        'lesson_desc' => $particulars->getLessonDesc(),
        'portfolio' => $particulars->getPortfolio(),
        'joined_date' => $particulars->getJoinedDate(),
    ];

    // Outputting JSON
    header('Content-Type: application/json');
    echo json_encode($item);
} else {
    // If no particulars are found, output an error message
    header('Content-Type: application/json');
    echo json_encode(['error' => 'User particulars not found']);
}
?>
