<?php
// smooTutor_db/get_messages.php
require_once 'common.php';

// Since authentication is not implemented yet, we'll use a hardcoded user_id
$user_id = 1; // Replace with actual user ID when authentication is implemented

if (!isset($_GET['chat_id'])) {
    echo json_encode(['error' => 'No chat specified.']);
    exit();
}

$chat_id = intval($_GET['chat_id']);

$dao = new MessageDAO();
$messages = $dao->getMessagesByChatId($chat_id);

echo json_encode(['messages' => $messages]);
?>
