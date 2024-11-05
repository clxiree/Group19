<?php
// get_chats.php
require_once 'common.php';

// Since authentication is not implemented yet, we'll use a hardcoded user_id
$user_id = 1; // Change this to the user ID you want to test with

$dao = new ChatDAO();
$chats = $dao->getAllChats($user_id);

$items = [];
foreach ($chats as $chat) {
    $item = [];
    $item['chat_id'] = $chat->getChatId();
    $item['is_group_chat'] = $chat->isGroupChat();
    $item['chat_name'] = $chat->getChatName();
    $item['last_message'] = $chat->getLastMessage();
    $item['sent_at'] = $chat->getSentAt();
    $item['sender_username'] = $chat->getSenderUsername();
    $items[] = $item;
}

// Output JSON
header('Content-Type: application/json');
echo json_encode($items);
?>
