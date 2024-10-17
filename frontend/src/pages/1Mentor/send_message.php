<?php
// send_message.php
require 'db_connect.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'Not authenticated']);
        exit();
    }

    $user_id = $_SESSION['user_id'];
    $chat_id = $_POST['chat_id'];
    $content = $_POST['content'];

    // Check if user is part of the chat
    $check_stmt = $conn->prepare("SELECT 1 FROM ChatParticipants WHERE chat_id = ? AND user_id = ?");
    $check_stmt->execute([$chat_id, $user_id]);
    if (!$check_stmt->fetch()) {
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }

    // Insert the message
    $stmt = $conn->prepare("INSERT INTO Messages (chat_id, sender_id, content) VALUES (?, ?, ?)");
    $stmt->execute([$chat_id, $user_id, $content]);

    echo json_encode(['success' => true]);
}
?>
