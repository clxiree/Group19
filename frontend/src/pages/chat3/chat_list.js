document.addEventListener('DOMContentLoaded', function () {
    const chatListContainer = document.getElementById('chat-list');

    // Fetch chat data from the PHP backend
    fetch('chat_data.php')
        .then(response => response.json())
        .then(chats => {
            chats.forEach(chat => {
                const chatItem = document.createElement('div');
                chatItem.classList.add('chat-item');
                chatItem.innerHTML = `
                    <div class="chat-avatar">T</div>
                    <div class="chat-info">
                        <span class="chat-name">Tutor: ${chat.tutorName}</span>
                        <p class="chat-last-message">${chat.lastMessage}</p>
                    </div>
                `;
                chatItem.addEventListener('click', () => openChat(chat.tutorName, chat.subject));
                chatListContainer.appendChild(chatItem);
            });
        })
        .catch(error => console.error('Error loading chat data:', error));
});

function openChat(tutorName, subject) {
    localStorage.setItem('selectedTutor', tutorName);
    localStorage.setItem('selectedSubject', subject);
    window.location.href = 'chat_page.html';
}
