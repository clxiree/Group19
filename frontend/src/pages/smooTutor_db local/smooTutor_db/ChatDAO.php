<?php
// ChatDAO.php
require_once 'Database.php';
require_once 'Chat.php';

class ChatDAO {
    public function getAllChats($user_id) {
        $conn = Database::getInstance()->getConnection();
    
        $sql = "
        SELECT c.chat_id, c.is_group_chat, c.chat_name,
               m.content AS last_message, m.sent_at,
               u.username AS sender_username
        FROM Chats c
        JOIN ChatParticipants cp ON c.chat_id = cp.chat_id
        LEFT JOIN Messages m ON m.message_id = (
            SELECT message_id
            FROM Messages
            WHERE chat_id = c.chat_id
            ORDER BY sent_at DESC
            LIMIT 1
        )
        LEFT JOIN Users u ON m.sender_id = u.user_id
        WHERE cp.user_id = :user_id
        ORDER BY m.sent_at DESC
        ";
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
    
        $chats = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $chat_id = $row['chat_id'];
            $is_group_chat = $row['is_group_chat'];
            $chat_name = $row['chat_name'];
            $last_message = $row['last_message'];
            $sent_at = $row['sent_at'];
            $sender_username = $row['sender_username'];
    
            if (!$is_group_chat) {
                // For private chats, set chat name as the other participant's username
                $chat_name = $this->getOtherParticipantUsername($chat_id, $user_id);
            }
    
            $chat = new Chat($chat_id, $is_group_chat, $chat_name, $last_message, $sent_at, $sender_username);
            $chats[] = $chat;
        }
    
        return $chats;
    }
    

    private function getOtherParticipantUsername($chat_id, $user_id) {
        $conn = Database::getInstance()->getConnection();
        $sql = "
        SELECT u.username
        FROM ChatParticipants cp
        JOIN Users u ON cp.user_id = u.user_id
        WHERE cp.chat_id = :chat_id AND cp.user_id != :user_id
        LIMIT 1
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':chat_id', $chat_id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $other_username = $stmt->fetchColumn();

        return $other_username ? $other_username : 'Unknown User';
    }
}
?>
