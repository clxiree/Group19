<?php
require_once 'Database.php';
require_once 'Particulars.php';

class ParticularsDAO {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo; // Initialize the PDO object for database interaction
    }

    // Create (Insert) a new Particulars record in the database
    public function createParticulars(Particulars $particulars) {
        $sql = "INSERT INTO particulars (userid, username, tutor, tutee, teachingcode, taughtcode, numberofreviews, oneliner, about, tutorrating, tuteerating, qualifications, rate, lessondesc, portfolio, joineddate)
                VALUES (:userid, :username, :tutor, :tutee, :teachingcode, :taughtcode, :numberofreviews, :oneliner, :about, :tutorrating, :tuteerating, :qualifications, :rate, :lessondesc, :portfolio, :joineddate)";
        
        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':userid', $particulars->getUserID());
        $stmt->bindValue(':username', $particulars->getUsername());
        $stmt->bindValue(':tutor', $particulars->getTutor());
        $stmt->bindValue(':tutee', $particulars->getTutee());
        $stmt->bindValue(':teachingcode', $particulars->getTeachingCode());
        $stmt->bindValue(':taughtcode', $particulars->getTaughtCode());
        $stmt->bindValue(':numberofreviews', $particulars->getNumberOfReviews());
        $stmt->bindValue(':oneliner', $particulars->getOneLiner());
        $stmt->bindValue(':about', $particulars->getAbout());
        $stmt->bindValue(':tutorrating', $particulars->getTutorRating());
        $stmt->bindValue(':tuteerating', $particulars->getTuteeRating());
        $stmt->bindValue(':qualifications', $particulars->getQualifications());
        $stmt->bindValue(':rate', $particulars->getRate());
        $stmt->bindValue(':lessondesc', $particulars->getLessonDesc());
        $stmt->bindValue(':portfolio', $particulars->getPortfolio());
        $stmt->bindValue(':joineddate', $particulars->getJoinedDate());

        return $stmt->execute();
    }

    // Read (Retrieve) a Particulars record by userID
    public function getParticularsByUserID($userid) {
        $sql = "SELECT * FROM particulars WHERE userid = :userid";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':userid', $userid);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return new Particulars(
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
        return null;
    }

    // Update an existing Particulars record
    public function updateParticulars(Particulars $particulars) {
        $sql = "UPDATE particulars 
                SET username = :username, tutor = :tutor, tutee = :tutee, teachingcode = :teachingcode, taughtcode = :taughtcode, 
                    numberofreviews = :numberofreviews, oneliner = :oneliner, about = :about, tutorrating = :tutorrating, 
                    tuteerating = :tuteerating, qualifications = :qualifications, rate = :rate, lessondesc = :lessondesc, 
                    portfolio = :portfolio, joineddate = :joineddate 
                WHERE userid = :userid";
        
        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':username', $particulars->getUsername());
        $stmt->bindValue(':tutor', $particulars->getTutor());
        $stmt->bindValue(':tutee', $particulars->getTutee());
        $stmt->bindValue(':teachingcode', $particulars->getTeachingCode());
        $stmt->bindValue(':taughtcode', $particulars->getTaughtCode());
        $stmt->bindValue(':numberofreviews', $particulars->getNumberOfReviews());
        $stmt->bindValue(':oneliner', $particulars->getOneLiner());
        $stmt->bindValue(':about', $particulars->getAbout());
        $stmt->bindValue(':tutorrating', $particulars->getTutorRating());
        $stmt->bindValue(':tuteerating', $particulars->getTuteeRating());
        $stmt->bindValue(':qualifications', $particulars->getQualifications());
        $stmt->bindValue(':rate', $particulars->getRate());
        $stmt->bindValue(':lessondesc', $particulars->getLessonDesc());
        $stmt->bindValue(':portfolio', $particulars->getPortfolio());
        $stmt->bindValue(':joineddate', $particulars->getJoinedDate());
        $stmt->bindValue(':userid', $particulars->getUserID());

        return $stmt->execute();
    }

    // Delete a Particulars record by userID
    public function deleteParticularsByUserID($userid) {
        $sql = "DELETE FROM particulars WHERE userid = :userid";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':userid', $userid);
        return $stmt->execute();
    }
}
