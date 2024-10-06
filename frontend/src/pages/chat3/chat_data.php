<?php
session_start();
header('Content-Type: application/json');

// Initialize chat sessions if they don't exist
if (!isset($_SESSION['chats'])) {
    $_SESSION['chats'] = [
        [
            'tutorName' => 'CLOUDY NG',
            'subject' => 'SBA101',
            'lastMessage' => '3.28PM: last text message xxxxxxx',
            'messages' => [
                ['timestamp' => '3.28PM', 'content' => 'last text message xxxxxxx', 'sender' => 'left'],
                ['timestamp' => '3.52PM', 'content' => 'last text lorem ipsum enige message xxxxxxx', 'sender' => 'right']
            ]
        ],
        [
            'tutorName' => 'CHRISPY LOH',
            'subject' => 'CKG101',
            'lastMessage' => '3.28PM: last text message xxxxxxx',
            'messages' => [
                ['timestamp' => '3.28PM', 'content' => 'last text message xxxxxxx', 'sender' => 'left'],
                ['timestamp' => '3.52PM', 'content' => 'last text lorem ipsum enige message xxxxxxx', 'sender' => 'right']
            ]
        ],
        [
            'tutorName' => 'Zenny Stone',
            'subject' => 'SLP101',
            'lastMessage' => '3.28PM: last text message xxxxxxx',
            'messages' => [
                ['timestamp' => '3.28PM', 'content' => 'last text message xxxxxxx', 'sender' => 'left'],
                ['timestamp' => '3.52PM', 'content' => 'last text lorem ipsum enige message xxxxxxx', 'sender' => 'right']
            ]
        ]
    ];
}

// Handle new messages
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    foreach ($_SESSION['chats'] as &$chat) {
        if ($chat['tutorName'] === $data['tutorName'] && $chat['subject'] === $data['subject']) {
            $newMessage = [
                'timestamp' => date('H:i A'),
                'content' => $data['message'],
                'sender' => $data['sender']
            ];
            $chat['messages'][] = $newMessage;
            $chat['lastMessage'] = $newMessage['timestamp'] . ": " . $newMessage['content'];
            break;
        }
    }
    echo json_encode(['status' => 'success']);
    exit;
}

// Return the chat list and messages as JSON
echo json_encode($_SESSION['chats']);
?>
