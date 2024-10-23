<?php

class Booking {
    private $id;
    private $coursename;
    private $coursecode;
    private $status;
    private $dateoflesson;
    private $mode;
    private $picture;
    private $price;

    public function __construct($id, $coursename, $coursecode, $status, $dateoflesson, $mode, $picture, $price) {
        $this->id = $id;
        $this->coursename = $coursename;
        $this->coursecode = $coursecode;
        $this->status = $status;
        $this->dateoflesson = $dateoflesson;
        $this->mode = $mode;
        $this->picture = $picture;
        $this->price = $price;
    }

    // Getters
    public function getID() {
        return $this->id;
    }

    public function getCourseName() {
        return $this->coursename;
    }

    public function getCourseCode() {
        return $this->coursecode;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getDateOfLesson() {
        return $this->dateoflesson;
    }

    public function getMode() {
        return $this->mode;
    }

    public function getPicture() {
        return $this->picture;
    }

    public function getPrice() {
        return $this->price;
    }
}