<?php
// get_messages.php
require 'db_connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$user_id = $_SESSION['user_id'];
$chat_id = $_GET['chat_id'];

// Check if user is part of the chat
$check_stmt = $conn->prepare("SELECT 1 FROM ChatParticipants WHERE chat_id = ? AND user_id = ?");
$check_stmt->execute([$chat_id, $user_id]);
if (!$check_stmt->fetch()) {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$stmt = $conn->prepare("
SELECT m.message_id, m.sender_id, u.username, m.content, m.sent_at
FROM Messages m
JOIN Users u ON m.sender_id = u.user_id
WHERE m.chat_id = ?
ORDER BY m.sent_at ASC
");
$stmt->execute([$chat_id]);
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages);
?>
