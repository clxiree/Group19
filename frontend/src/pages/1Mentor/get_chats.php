<?php
// get_chats.php
require 'db_connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$user_id = $_SESSION['user_id'];

$sql = "
SELECT c.chat_id, c.chat_name, c.is_group_chat, m.content AS last_message, m.sent_at, u.username AS sender_username
FROM Chats c
JOIN ChatParticipants cp ON c.chat_id = cp.chat_id
LEFT JOIN (
    SELECT chat_id, MAX(sent_at) AS last_message_time
    FROM Messages
    GROUP BY chat_id
) lm ON c.chat_id = lm.chat_id
LEFT JOIN Messages m ON lm.chat_id = m.chat_id AND lm.last_message_time = m.sent_at
LEFT JOIN Users u ON m.sender_id = u.user_id
WHERE cp.user_id = ?
ORDER BY lm.last_message_time DESC
";

$stmt = $conn->prepare($sql);
$stmt->execute([$user_id]);
$chats = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($chats);
?>
