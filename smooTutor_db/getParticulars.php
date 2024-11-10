<?php

require_once 'common.php';
$dao = new ParticularsDAO();
$particulars = $dao->getAll(); // Get an Indexed Array of Particular objects

$items = [];
foreach ($particulars as $particular_object) {
    $item = [];
    $item["userid"] = $particular_object->getUserID();
    $item["username"] = $particular_object->getUsername();
    $item["tutor"] = $particular_object->getTutor();
    $item["tutee"] = $particular_object->getTutee();
    $item["teachingcode"] = $particular_object->getTeachingCode();
    $item["taughtcode"] = $particular_object->getTaughtCode();
    $item["numberofreviews"] = $particular_object->getNumberOfReviews();
    $item["oneliner"] = $particular_object->getOneLiner();
    $item["about"] = $particular_object->getAbout();
    $item["tutorrating"] = $particular_object->getTutorRating();
    $item["tuteerating"] = $particular_object->getTuteeRating();
    $item["qualifications"] = $particular_object->getQualifications();
    $item["rate"] = $particular_object->getRate();
    $item["lessondesc"] = $particular_object->getLessonDesc();
    $item["portfolio"] = $particular_object->getPortfolio();
    $item["joineddate"] = $particular_object->getJoinedDate() ? $particular_object->getJoinedDate()->format('Y-m-d') : null;
    $items[] = $item;
}

// Convert particulars to JSON and return JSON data
$particularsJSON = json_encode($items);
echo $particularsJSON;

?>
