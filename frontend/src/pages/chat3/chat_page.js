// Load chat data and display it
function loadChat() {
    const tutorName = localStorage.getItem('selectedTutor');
    const subject = localStorage.getItem('selectedSubject');
    
    // Set chat header with selected tutor and subject
    document.getElementById('chat-header-name').innerText = `Tutor: ${tutorName} - Subject: ${subject}`;
    document.getElementById('chat-name').innerText = `Tutor: ${tutorName}`;

    // Fetch chat data (for demonstration using static data)
    fetch('chat_data.php')
        .then(response => response.json())
        .then(chats => {
            const chatBox = document.getElementById('chat-box');
            const chat = chats.find(c => c.tutorName === tutorName && c.subject === subject);
            if (chat) {
                chat.messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add(message.sender === 'left' ? 'message-left' : 'message-right');
                    messageElement.innerHTML = `
                        <p class="message-content">${message.timestamp}: ${message.content}</p>
                        ${message.sender === 'right' ? '<span class="read-receipt"><i class="fas fa-check-double"></i></span>' : ''}
                    `;
                    chatBox.appendChild(messageElement);
                });
            }
        })
        .catch(error => console.error('Error loading chat data:', error));
}

// Function to go back to the chat list
function goBack() {
    window.location.href = 'chat_list.html';
}

// Initialize Emoji Picker
const emojiPicker = new EmojiButton();
document.querySelector('#emoji-button').addEventListener('click', () => {
    emojiPicker.togglePicker(document.querySelector('#emoji-button'));
});

emojiPicker.on('emoji', emoji => {
    document.querySelector('#chat-input').textContent += emoji;
});

// Handle file uploads
document.querySelector('#file-button').addEventListener('click', () => {
    document.querySelector('#file-input').click();
});

// Sending new messages
document.querySelector('#send-button').addEventListener('click', () => {
    const messageContent = document.querySelector('#chat-input').textContent.trim();
    if (messageContent) {
        sendMessage(messageContent);
        document.querySelector('#chat-input').textContent = ''; // Clear the input after sending
    }
});

function sendMessage(message) {
    const tutorName = localStorage.getItem('selectedTutor');
    const subject = localStorage.getItem('selectedSubject');
    
    // Post message to the server
    fetch('chat_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tutorName,
            subject,
            message,
            sender: 'right'
        })
    }).then(() => loadChat()); // Reload the chat after sending
}

// Show typing indicator (simulation)
const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('input', () => {
    document.getElementById('typing-indicator').style.display = 'block';
    setTimeout(() => {
        document.getElementById('typing-indicator').style.display = 'none';
    }, 1000); // Hide typing indicator after 1 second of inactivity
});
