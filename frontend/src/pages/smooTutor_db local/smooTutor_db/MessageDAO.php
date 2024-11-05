<?php
// smooTutor_db/MessageDAO.php
require_once 'Database.php';

class MessageDAO {
    public function getMessagesByChatId($chat_id) {
        $conn = Database::getInstance()->getConnection();

        $sql = "
        SELECT m.message_id, m.chat_id, m.sender_id, m.content, m.sent_at, u.username
        FROM Messages m
        JOIN Users u ON m.sender_id = u.user_id
        WHERE m.chat_id = :chat_id
        ORDER BY m.sent_at ASC
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':chat_id', $chat_id, PDO::PARAM_INT);
        $stmt->execute();

        $messages = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $messages[] = $row;
        }

        return $messages;
    }

    public function addMessage($chat_id, $sender_id, $content) {
        $conn = Database::getInstance()->getConnection();

        $sql = "
        INSERT INTO Messages (chat_id, sender_id, content, sent_at)
        VALUES (:chat_id, :sender_id, :content, NOW())
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':chat_id', $chat_id, PDO::PARAM_INT);
        $stmt->bindParam(':sender_id', $sender_id, PDO::PARAM_INT);
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);

        return $stmt->execute();
    }
}
?>
