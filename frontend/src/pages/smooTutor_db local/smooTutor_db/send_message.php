<?php
// smooTutor_db/send_message.php
require_once 'common.php';

// Since authentication is not implemented yet, we'll use a hardcoded user_id
$user_id = 1; // Replace with actual user ID when authentication is implemented

if (!isset($_POST['chat_id']) || !isset($_POST['content'])) {
    echo json_encode(['error' => 'Invalid request.']);
    exit();
}

$chat_id = intval($_POST['chat_id']);
$content = trim($_POST['content']);

if ($content === '') {
    echo json_encode(['error' => 'Message content cannot be empty.']);
    exit();
}

$dao = new MessageDAO();
$result = $dao->addMessage($chat_id, $user_id, $content);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Failed to send message.']);
}
?>
