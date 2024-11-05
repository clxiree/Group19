<?php
// Chat.php
class Chat {
    private $chat_id;
    private $is_group_chat;
    private $chat_name;
    private $last_message;
    private $sent_at;
    private $sender_username;

    public function __construct($chat_id, $is_group_chat, $chat_name, $last_message, $sent_at, $sender_username) {
        $this->chat_id = $chat_id;
        $this->is_group_chat = $is_group_chat;
        $this->chat_name = $chat_name;
        $this->last_message = $last_message;
        $this->sent_at = $sent_at;
        $this->sender_username = $sender_username;
    }

    // Getters
    public function getChatId() {
        return $this->chat_id;
    }

    public function isGroupChat() {
        return $this->is_group_chat;
    }

    public function getChatName() {
        return $this->chat_name;
    }

    public function getLastMessage() {
        return $this->last_message;
    }

    public function getSentAt() {
        return $this->sent_at;
    }

    public function getSenderUsername() {
        return $this->sender_username;
    }
}
?>
