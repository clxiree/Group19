<?php

class Particulars {
    private $userid;
    private $username;
    private $tutor;
    private $tutee;
    private $teachingcode;
    private $taughtcode;
    private $numberofreviews;
    private $oneliner;
    private $about;
    private $tutorrating;
    private $tuteerating;
    private $qualifications;
    private $rate;
    private $lessondesc;
    private $portfolio;
    private $joineddate;

    public function __construct($userid, $username, $tutor, $tutee, $teachingcode, $taughtcode, $numberofreviews, $oneliner, $about, $tutorrating, $tuteerating, $qualifications, $rate, $lessondesc, $portfolio, $joineddate) {
        $this->userid = $userid;
        $this->username = $username;
        $this->tutor = $tutor;
        $this->tutee = $tutee;
        $this->teachingcode = $teachingcode;
        $this->taughtcode = $taughtcode;
        $this->numberofreviews = $numberofreviews;
        $this->oneliner = $oneliner;
        $this->about = $about;
        $this->tutorrating = $tutorrating;
        $this->tuteerating = $tuteerating;
        $this->qualifications = $qualifications;
        $this->rate = $rate;
        $this->lessondesc = $lessondesc;
        $this->portfolio = $portfolio;
        $this->joineddate = $joineddate;
    }

    // Getters
    public function getUserID() {
        return $this->userid;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getTutor() {
        return $this->tutor;
    }

    public function getTutee() {
        return $this->tutee;
    }

    public function getTeachingCode() {
        return $this->teachingcode;
    }

    public function getTaughtCode() {
        return $this->taughtcode;
    }

    public function getNumberOfReviews() {
        return $this->numberofreviews;
    }

    public function getOneLiner() {
        return $this->oneliner;
    }

    public function getAbout() {
        return $this->about;
    }

    public function getTutorRating() {
        return $this->tutorrating;
    }

    public function getTuteeRating() {
        return $this->tuteerating;
    }

    public function getQualifications() {
        return $this->qualifications;
    }

    public function getRate() {
        return $this->rate;
    }

    public function getLessonDesc() {
        return $this->lessondesc;
    }

    public function getPortfolio() {
        return $this->portfolio;
    }

    public function getJoinedDate() {
        return $this->joineddate;
    }
}
