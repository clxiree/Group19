<?php

require_once 'common.php';

class BookingsDAO {

    public function getAll() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    id,
                    coursename,
                    coursecode,
                    status,
                    dateoflesson,
                    mode,
                    picture,
                    price
                FROM bookings"; // SELECT * FROM bookings;
        $stmt = $conn->prepare($sql);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $bookings = []; // Indexed Array of Booking objects
        while( $row = $stmt->fetch() ) {
            $bookings[] =
                new Booking(
                    $row['id'],
                    $row['coursename'],
                    $row['coursecode'],
                    $row['status'],
                    $row['dateoflesson'],
                    $row['mode'],
                    $row['picture'],
                    $row['price']);
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $bookings;
    }

    public function get($id) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    *
                FROM bookings
                WHERE 
                    id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $booking_object = null;
        if( $row = $stmt->fetch() ) {
            $booking_object = 
                new Booking(
                    $row['id'],
                    $row['coursename'],
                    $row['coursecode'],
                    $row['status'],
                    $row['dateoflesson'],
                    $row['mode'],
                    $row['picture'],
                    $row['price']);
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $booking_object;
    }

    public function update($id, $coursename, $coursecode, $status, $dateoflesson, $mode, $picture, $price) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE
                    bookings
                SET
                    coursename = :coursename,
                    coursecode = :coursecode,
                    status = :status,
                    dateoflesson = :dateoflesson,
                    mode = :mode,
                    picture = :picture,
                    price = :price
                WHERE 
                    id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':coursename', $coursename, PDO::PARAM_STR);
        $stmt->bindParam(':coursecode', $coursecode, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':dateoflesson', $dateoflesson, PDO::PARAM_STR);
        $stmt->bindParam(':mode', $mode, PDO::PARAM_STR);
        $stmt->bindParam(':picture', $picture, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function delete($id) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "DELETE FROM
                    bookings
                WHERE 
                    id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function add($coursename, $coursecode, $status, $dateoflesson, $mode, $picture, $price) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO bookings
                    (
                        coursename, 
                        coursecode, 
                        status, 
                        dateoflesson, 
                        mode, 
                        picture, 
                        price
                    )
                VALUES
                    (
                        :coursename,
                        :coursecode,
                        :status,
                        :dateoflesson,
                        :mode,
                        :picture,
                        :price
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':coursename', $coursename, PDO::PARAM_STR);
        $stmt->bindParam(':coursecode', $coursecode, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':dateoflesson', $dateoflesson, PDO::PARAM_STR);
        $stmt->bindParam(':mode', $mode, PDO::PARAM_STR);
        $stmt->bindParam(':picture', $picture, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
}

?>