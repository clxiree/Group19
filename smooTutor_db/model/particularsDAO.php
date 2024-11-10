<?php

require_once "particulars.php";
require_once "ConnectionManager.php";

class ParticularsDAO {

    public function getAll() {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        $sql = "SELECT * FROM particulars";
        $stmt = $conn->prepare($sql);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $particulars = [];
        while ($row = $stmt->fetch()) {
            $particulars[] = new Particulars(
                $row['userid'],
                $row['username'],
                $row['tutor'],
                $row['tutee'],
                $row['teachingcode'],
                $row['taughtcode'],
                $row['numberofreviews'],
                $row['oneliner'],
                $row['about'],
                $row['tutorrating'],
                $row['tuteerating'],
                $row['qualifications'],
                $row['rate'],
                $row['lessondesc'],
                $row['portfolio'],
                $row['joineddate']
            );
        }

        $stmt = null;
        $conn = null;

        return $particulars;
    }

    public function get($userid) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        $sql = "SELECT * FROM particulars WHERE userid = :userid";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $particular = null;
        if ($row = $stmt->fetch()) {
            $particular = new Particulars(
                $row['userid'],
                $row['username'],
                $row['tutor'],
                $row['tutee'],
                $row['teachingcode'],
                $row['taughtcode'],
                $row['numberofreviews'],
                $row['oneliner'],
                $row['about'],
                $row['tutorrating'],
                $row['tuteerating'],
                $row['qualifications'],
                $row['rate'],
                $row['lessondesc'],
                $row['portfolio'],
                $row['joineddate']
            );
        }

        $stmt = null;
        $conn = null;

        return $particular;
    }

    public function update($userid, $username, $tutor, $tutee, $teachingcode, $taughtcode, $numberofreviews, $oneliner, $about, $tutorrating, $tuteerating, $qualifications, $rate, $lessondesc, $portfolio, $joineddate) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        $sql = "UPDATE particulars SET
                username = :username,
                tutor = :tutor,
                tutee = :tutee,
                teachingcode = :teachingcode,
                taughtcode = :taughtcode,
                numberofreviews = :numberofreviews,
                oneliner = :oneliner,
                about = :about,
                tutorrating = :tutorrating,
                tuteerating = :tuteerating,
                qualifications = :qualifications,
                rate = :rate,
                lessondesc = :lessondesc,
                portfolio = :portfolio,
                joineddate = :joineddate
                WHERE userid = :userid";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':tutor', $tutor, PDO::PARAM_STR);
        $stmt->bindParam(':tutee', $tutee, PDO::PARAM_STR);
        $stmt->bindParam(':teachingcode', $teachingcode, PDO::PARAM_STR);
        $stmt->bindParam(':taughtcode', $taughtcode, PDO::PARAM_STR);
        $stmt->bindParam(':numberofreviews', $numberofreviews, PDO::PARAM_STR);
        $stmt->bindParam(':oneliner', $oneliner, PDO::PARAM_STR);
        $stmt->bindParam(':about', $about, PDO::PARAM_STR);
        $stmt->bindParam(':tutorrating', $tutorrating, PDO::PARAM_STR);
        $stmt->bindParam(':tuteerating', $tuteerating, PDO::PARAM_STR);
        $stmt->bindParam(':qualifications', $qualifications, PDO::PARAM_STR);
        $stmt->bindParam(':rate', $rate, PDO::PARAM_STR);
        $stmt->bindParam(':lessondesc', $lessondesc, PDO::PARAM_STR);
        $stmt->bindParam(':portfolio', $portfolio, PDO::PARAM_STR);
        $stmt->bindParam(':joineddate', $joineddate);

        $status = $stmt->execute();

        $stmt = null;
        $conn = null;

        return $status;
    }

    public function delete($userid) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        $sql = "DELETE FROM particulars WHERE userid = :userid";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);

        $status = $stmt->execute();

        $stmt = null;
        $conn = null;

        return $status;
    }

    public function add($username, $tutor, $tutee, $teachingcode, $taughtcode, $numberofreviews, $oneliner, $about, $tutorrating, $tuteerating, $qualifications, $rate, $lessondesc, $portfolio, $joineddate) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        $sql = "INSERT INTO particulars
                (username, tutor, tutee, teachingcode, taughtcode, numberofreviews, oneliner, about, tutorrating, tuteerating, qualifications, rate, lessondesc, portfolio, joineddate)
                VALUES
                (:username, :tutor, :tutee, :teachingcode, :taughtcode, :numberofreviews, :oneliner, :about, :tutorrating, :tuteerating, :qualifications, :rate, :lessondesc, :portfolio, :joineddate)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':tutor', $tutor, PDO::PARAM_STR);
        $stmt->bindParam(':tutee', $tutee, PDO::PARAM_STR);
        $stmt->bindParam(':teachingcode', $teachingcode, PDO::PARAM_STR);
        $stmt->bindParam(':taughtcode', $taughtcode, PDO::PARAM_STR);
        $stmt->bindParam(':numberofreviews', $numberofreviews, PDO::PARAM_STR);
        $stmt->bindParam(':oneliner', $oneliner, PDO::PARAM_STR);
        $stmt->bindParam(':about', $about, PDO::PARAM_STR);
        $stmt->bindParam(':tutorrating', $tutorrating, PDO::PARAM_STR);
        $stmt->bindParam(':tuteerating', $tuteerating, PDO::PARAM_STR);
        $stmt->bindParam(':qualifications', $qualifications, PDO::PARAM_STR);
        $stmt->bindParam(':rate', $rate, PDO::PARAM_STR);
        $stmt->bindParam(':lessondesc', $lessondesc, PDO::PARAM_STR);
        $stmt->bindParam(':portfolio', $portfolio, PDO::PARAM_STR);
        $stmt->bindParam(':joineddate', $joineddate);

        $status = $stmt->execute();

        $stmt = null;
        $conn = null;

        return $status;
    }
}

?>
