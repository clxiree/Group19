// scripts/chats.js

// Initialize Firebase (Ensure firebaseConfig is correctly set)
const firebaseConfig = {
    apiKey: "AIzaSyDpmHo8Y79lMhABi1WuRaJ25ulV4JMdRGY",
    authDomain: "smootutor-ed94a.firebaseapp.com",
    databaseURL: "https://smootutor-ed94a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smootutor-ed94a",
    storageBucket: "smootutor-ed94a.appspot.com",
    messagingSenderId: "289686522861",
    appId: "1:289686522861:web:5811385ced42106d78b5e4",
    measurementId: "G-46QED8ZFKJ"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Global Variables
let currentUser = null;
let selectedChatId = null;
let messagesListener = null;

// DOM Elements
const chatListElement = document.getElementById("chat-list");
const newChatButton = document.getElementById("new-chat-button");
const chatHeader = document.getElementById("chat-header");
const chatNameElement = document.getElementById("chat-name");
const chatAvatarElement = document.getElementById("chat-avatar");
const chatStatusElement = document.getElementById("chat-status");
const messageListElement = document.getElementById("message-list");
const messageInput = document.getElementById("message-text");
const sendMessageButton = document.getElementById("send-message-button");
const attachFileButton = document.getElementById("attach-file-button");
const attachFileInput = document.getElementById("attach-file-input");
const emojiButton = document.getElementById("emoji-button");
const scheduleMessageButton = document.getElementById("schedule-message-button");
const scheduleMessageModal = document.getElementById("schedule-message-modal");
const scheduleCloseButton = document.getElementById("schedule-close-button");
const scheduleMessageForm = document.getElementById("schedule-message-form");
const scheduledMessageText = document.getElementById("scheduled-message-text");
const scheduledTimeInput = document.getElementById("scheduled-time");
const typingIndicator = document.getElementById("typing-indicator");
const typingText = document.getElementById("typing-text");
const settingsModal = document.getElementById("settings-modal");
const settingsCloseButton = document.getElementById("settings-close-button");
const settingsForm = document.getElementById("settings-form");
const deleteChatButton = document.getElementById("delete-chat-button");
const noChatSelected = document.getElementById("no-chat-selected");
const noChatImage = document.getElementById("no-chat-image");
const logoImage = document.getElementById("logo-image");

// Emoji Picker Initialization
const picker = new EmojiButton({
    position: 'top-start'
});

picker.on('emoji', emoji => {
    messageInput.value += emoji;
    messageInput.focus();
});

emojiButton.addEventListener('click', () => {
    picker.togglePicker(emojiButton);
});

// Authenticate and fetch chats
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        initializeChatApp();
    } else {
        // Redirect to login page if not authenticated
        window.location.href = 'home/login.html';
    }
});

// Initialize Chat Application
function initializeChatApp() {
    fetchUserProfile();
    fetchChats();
    setupEventListeners();
    setupTypingListener();
    setupOnlineStatusListener();
    loadScheduledMessages();
    updateOnlineStatus(true);
    loadLogoImage();
    setNoChatPlaceholderImage();
}

// Fetch User Profile
function fetchUserProfile() {
    const userRef = db.collection("Particulars").doc(currentUser.uid);
    userRef.get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            // Optionally, update UI with user data
        }
    }).catch(error => {
        console.error("Error fetching user profile:", error);
    });
}

// Load Logo Image from Firebase Storage
function loadLogoImage() {
    if (logoImage) {
        const logoImageRef = storage.ref("images/smootutor-logo.jpg");
        logoImageRef.getDownloadURL().then(url => {
            logoImage.src = url;
        }).catch(error => {
            console.error("Error loading logo image:", error);
            logoImage.src = "assets/img/smootutor-logo.jpg"; // Fallback to local image
        });
    }
}

// Set Placeholder Image for No Chat Selected
function setNoChatPlaceholderImage() {
    if (noChatImage) {
        const placeholderRef = storage.ref("images/chats/chat-placeholder.png");
        placeholderRef.getDownloadURL().then(url => {
            noChatImage.src = url;
        }).catch(error => {
            console.error("Error loading placeholder image:", error);
            noChatImage.src = "assets/img/chat-placeholder.png"; // Fallback to local image
        });
    }
}

// Fetch and display chats
function fetchChats() {
    db.collection("Chats")
        .where("members", "array-contains", currentUser.uid)
        .orderBy("lastMessage.sentAt", "desc")
        .onSnapshot(snapshot => {
            chatListElement.innerHTML = '';
            snapshot.forEach(doc => {
                const chatData = doc.data();
                renderChatItem(doc.id, chatData);
            });
        }, error => {
            console.error("Error fetching chats:", error);
        });
}

// Render Chat Item
function renderChatItem(chatId, chatData) {
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat-item", "d-flex", "align-items-center");
    chatItem.dataset.chatId = chatId;

    const defaultChatAvatar = "assets/img/default-avatar.png";
    const chatAvatarSrc = chatData.chatAvatar ? chatData.chatAvatar : defaultChatAvatar;

    // Fetch chat avatar from Firebase Storage if chatAvatar is present
    if (chatData.chatAvatar) {
        const chatAvatarRef = storage.refFromURL(chatData.chatAvatar);
        chatAvatarRef.getDownloadURL().then(url => {
            chatItem.querySelector('img').src = url;
        }).catch(error => {
            console.error("Error loading chat avatar:", error);
            chatItem.querySelector('img').src = defaultChatAvatar; // Fallback to default
        });
    }

    // Create image element with a placeholder; src will be updated
    const avatarImg = document.createElement("img");
    avatarImg.src = defaultChatAvatar;
    avatarImg.alt = "Chat Avatar";
    avatarImg.classList.add("rounded-circle", "me-2");
    avatarImg.width = 50;
    avatarImg.height = 50;
    avatarImg.style.objectFit = "cover";
    chatItem.appendChild(avatarImg);

    const chatItemInfo = document.createElement("div");
    chatItemInfo.classList.add("chat-item-info");

    const chatNameDiv = document.createElement("div");
    chatNameDiv.classList.add("chat-item-name");
    chatNameDiv.textContent = chatData.chatName || "Chat";
    chatItemInfo.appendChild(chatNameDiv);

    const lastMessageDiv = document.createElement("div");
    lastMessageDiv.classList.add("chat-item-last-message");
    lastMessageDiv.textContent = chatData.lastMessage ? (chatData.lastMessage.type === 'text' ? chatData.lastMessage.content : '📎 Attachment') : '';
    chatItemInfo.appendChild(lastMessageDiv);

    chatItem.appendChild(chatItemInfo);

    // Display unread count if any
    if (chatData.unreadCount > 0) {
        const unreadSpan = document.createElement("span");
        unreadSpan.classList.add("unread-count");
        unreadSpan.textContent = chatData.unreadCount;
        chatItem.appendChild(unreadSpan);
    }

    // Add click event listener to select chat
    chatItem.addEventListener("click", () => selectChat(chatId, chatData));

    chatListElement.appendChild(chatItem);
}

// Select Chat
function selectChat(chatId, chatData) {
    if (selectedChatId === chatId) return; // Already selected

    selectedChatId = chatId;
    noChatSelected.style.display = "none";
    chatHeader.style.display = "flex";
    document.getElementById("message-input-container").style.display = "flex";
    messageInput.disabled = false;
    attachFileButton.disabled = false;
    sendMessageButton.disabled = false;
    scheduleMessageButton.disabled = false;

    // Update Chat Header
    chatNameElement.textContent = chatData.chatName || "Chat";

    // Fetch and display chat avatar
    const chatAvatarImg = chatAvatarElement;
    const defaultChatAvatar = "assets/img/default-avatar.png";
    chatAvatarImg.src = defaultChatAvatar; // Set default first

    if (chatData.chatAvatar) {
        const chatAvatarRef = storage.refFromURL(chatData.chatAvatar);
        chatAvatarRef.getDownloadURL().then(url => {
            chatAvatarImg.src = url;
        }).catch(error => {
            console.error("Error loading chat avatar:", error);
            chatAvatarImg.src = defaultChatAvatar; // Fallback to default
        });
    }

    // Display Online Status of the recipient
    displayOnlineStatus(chatData.members.filter(member => member !== currentUser.uid)[0]);

    // Highlight the selected chat
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.chat-item[data-chat-id="${chatId}"]`).classList.add('active');

    // Fetch and display messages
    fetchMessages(chatId);

    // Reset unread count
    resetUnreadCount(chatId);
}

// Fetch Messages
function fetchMessages(chatId) {
    if (messagesListener) {
        messagesListener(); // Detach previous listener
    }
    messagesListener = db.collection("Chats").doc(chatId).collection("messages")
        .orderBy("sentAt", "asc")
        .onSnapshot(snapshot => {
            messageListElement.innerHTML = '';
            snapshot.forEach(doc => {
                const messageData = doc.data();
                renderMessage(messageData);
            });
            messageListElement.scrollTop = messageListElement.scrollHeight;
        }, error => {
            console.error("Error fetching messages:", error);
        });
}

// Render Message
function renderMessage(messageData) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", messageData.senderId === currentUser.uid ? "sent" : "received");

    let messageContent = '';

    if (messageData.type === "text") {
        messageContent = parseMessageText(messageData.content);
    } else if (messageData.type === "file") {
        messageContent = `<a href="${messageData.content}" target="_blank">📎 ${messageData.fileName}</a>`;
    }

    messageDiv.innerHTML = `
      ${messageContent}
      <div class="timestamp">${formatTimestamp(messageData.sentAt)} 
        ${messageData.senderId === currentUser.uid ? (messageData.read ? '<i class="fas fa-check-double" style="color: blue;"></i>' : '<i class="fas fa-check"></i>') : ''}
      </div>
      ${messageData.senderId === currentUser.uid ? `<button class="delete-message" data-message-id="${messageData.messageId}"><i class="fas fa-trash-alt"></i></button>` : ''}
    `;

    // Delete message functionality
    if (messageData.senderId === currentUser.uid) {
        const deleteButton = messageDiv.querySelector('.delete-message');
        deleteButton.addEventListener('click', () => deleteMessage(selectedChatId, messageData.messageId));
    }

    messageListElement.appendChild(messageDiv);
}

// Parse Message Text for Rich Formatting and Emojis
function parseMessageText(text) {
    // Replace markdown-like syntax with HTML tags
    let parsedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/__(.*?)__/g, '<u>$1</u>'); // Underline

    // Replace :emoji_name: with emoji characters using Emoji Picker library
    parsedText = parsedText.replace(/:([a-zA-Z0-9_+-]+):/g, (match, p1) => {
        const emoji = getEmojiByName(p1);
        return emoji ? emoji : match;
    });

    return parsedText;
}

// Simple Emoji Lookup Function
function getEmojiByName(name) {
    const emojis = {
        smile: '😊',
        thumbsup: '👍',
        heart: '❤️',
        laugh: '😂',
        cry: '😢',
        wink: '😉',
        // Add more emojis as needed
    };
    return emojis[name];
}

// Format Timestamp
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const userSettings = getUserSettings();

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: userSettings.timeFormat === '12',
    };

    return date.toLocaleString('en-US', options);
}

// Send Message
sendMessageButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text && selectedChatId) {
        const messageRef = db.collection("Chats").doc(selectedChatId).collection("messages").doc();
        const messageData = {
            messageId: messageRef.id,
            content: text,
            senderId: currentUser.uid,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            type: "text",
            read: false,
        };

        messageRef.set(messageData).then(() => {
            messageInput.value = "";
            updateLastMessage(selectedChatId, messageData);
        }).catch(error => {
            console.error("Error sending message:", error);
        });
    }
}

// Update Last Message in Chat
function updateLastMessage(chatId, messageData) {
    db.collection("Chats").doc(chatId).update({
        lastMessage: {
            content: messageData.content,
            sentAt: messageData.sentAt,
            type: messageData.type,
            senderId: messageData.senderId,
        }
    }).then(() => {
        // Optionally, handle additional logic here
    }).catch(error => {
        console.error("Error updating last message:", error);
    });
}

// Delete Message
function deleteMessage(chatId, messageId) {
    if (confirm("Are you sure you want to delete this message?")) {
        db.collection("Chats").doc(chatId).collection("messages").doc(messageId).delete()
            .then(() => {
                console.log("Message deleted successfully.");
            })
            .catch(error => {
                console.error("Error deleting message:", error);
            });
    }
}

// Attach File
attachFileButton.addEventListener("click", () => {
    attachFileInput.click();
});

attachFileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file && selectedChatId) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
            const fileRef = storage.ref(`files/chats/${selectedChatId}/${file.name}`);
            const uploadTask = fileRef.put(file);

            uploadTask.on('state_changed',
                snapshot => {
                    // Optional: Implement progress indicator
                },
                error => {
                    console.error("Error uploading file:", error);
                    alert("Error uploading file. Please try again.");
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        sendFileMessage(downloadURL, file.name, file.type);
                    });
                }
            );
        } else {
            alert("File size exceeds 10MB limit.");
        }
    }
});

// Send File Message
function sendFileMessage(fileURL, fileName, fileType) {
    const messageRef = db.collection("Chats").doc(selectedChatId).collection("messages").doc();
    const messageData = {
        messageId: messageRef.id,
        content: fileURL,
        fileName: fileName,
        fileType: fileType,
        senderId: currentUser.uid,
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: "file",
        read: false,
    };

    messageRef.set(messageData).then(() => {
        updateLastMessage(selectedChatId, messageData);
    }).catch(error => {
        console.error("Error sending file message:", error);
    });
}

// Scheduled Messages
scheduleMessageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = scheduledMessageText.value.trim();
    const scheduledTime = new Date(scheduledTimeInput.value).getTime();

    if (text && scheduledTime) {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (scheduledTime - now <= oneWeek && scheduledTime - now > 0) {
            scheduleMessage(text, scheduledTime);
            scheduleMessageModal.style.display = "none";
            scheduleMessageForm.reset();
            alert("Message scheduled successfully.");
        } else {
            alert("Please select a time within the next week.");
        }
    } else {
        alert("Please enter a message and select a time.");
    }
});

// Open Schedule Message Modal
scheduleMessageButton.addEventListener("click", () => {
    scheduleMessageModal.style.display = "block";
    // Set the minimum date and time to now
    scheduledTimeInput.min = new Date().toISOString().slice(0, -8);
});

// Close Schedule Message Modal
scheduleCloseButton.addEventListener("click", () => {
    scheduleMessageModal.style.display = "none";
});

// Schedule Message Function
function scheduleMessage(text, scheduledTime) {
    const delay = scheduledTime - Date.now();
    if (delay > 0) {
        const timeoutId = setTimeout(() => {
            sendScheduledMessage(text);
            // Remove from scheduledMessages array
            scheduledMessages = scheduledMessages.filter(msg => msg.timeoutId !== timeoutId);
        }, delay);
        // Store the timeout ID to manage scheduled messages if needed
        scheduledMessages.push({ text, scheduledTime, timeoutId });
    }
}

// Send Scheduled Message
function sendScheduledMessage(text) {
    if (selectedChatId) {
        const messageRef = db.collection("Chats").doc(selectedChatId).collection("messages").doc();
        const messageData = {
            messageId: messageRef.id,
            content: text,
            senderId: currentUser.uid,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            type: "text",
            read: false,
        };

        messageRef.set(messageData).then(() => {
            updateLastMessage(selectedChatId, messageData);
            alert("Scheduled message sent.");
        }).catch(error => {
            console.error("Error sending scheduled message:", error);
        });
    } else {
        alert("No chat selected. Scheduled message not sent.");
    }
}

// Load Scheduled Messages on Page Load
function loadScheduledMessages() {
    scheduledMessages.forEach(msg => {
        clearTimeout(msg.timeoutId);
        const delay = msg.scheduledTime - Date.now();
        if (delay > 0) {
            msg.timeoutId = setTimeout(() => {
                sendScheduledMessage(msg.text);
                scheduledMessages = scheduledMessages.filter(m => m.timeoutId !== msg.timeoutId);
            }, delay);
        } else {
            sendScheduledMessage(msg.text);
            scheduledMessages = scheduledMessages.filter(m => m.timeoutId !== msg.timeoutId);
        }
    });
}

// Listen for Typing Indicators
function setupTypingListener() {
    messageInput.addEventListener("input", () => {
        if (selectedChatId) {
            const typingRef = db.collection("Chats").doc(selectedChatId).collection("typing").doc(currentUser.uid);
            typingRef.set({
                isTyping: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            // Remove typing status after 2 seconds of inactivity
            setTimeout(() => {
                typingRef.delete();
            }, 2000);
        }
    });

    // Listen for typing indicators from other users
    db.collection("Chats").doc(selectedChatId).collection("typing")
        .onSnapshot(snapshot => {
            let isTyping = false;
            snapshot.forEach(doc => {
                if (doc.id !== currentUser.uid) {
                    isTyping = true;
                }
            });

            if (isTyping) {
                typingIndicator.style.display = "flex";
                typingText.textContent = "Someone is typing...";
            } else {
                typingIndicator.style.display = "none";
            }
        });
}

// Listen for Online Status
function setupOnlineStatusListener() {
    const recipientId = getRecipientId();
    if (recipientId) {
        db.collection("Particulars").doc(recipientId).onSnapshot(doc => {
            if (doc.exists) {
                const status = doc.data().online;
                if (status) {
                    chatStatusElement.textContent = "Online";
                    chatStatusElement.style.color = "green";
                } else {
                    chatStatusElement.textContent = "Offline";
                    chatStatusElement.style.color = "gray";
                }
            }
        }, error => {
            console.error("Error fetching online status:", error);
        });
    }
}

// Get Recipient ID (Assuming two members per chat)
function getRecipientId() {
    if (selectedChatId) {
        const chatRef = db.collection("Chats").doc(selectedChatId);
        chatRef.get().then(doc => {
            if (doc.exists) {
                const chatData = doc.data();
                const recipient = chatData.members.find(member => member !== currentUser.uid);
                return recipient;
            }
            return null;
        }).catch(error => {
            console.error("Error getting recipient ID:", error);
            return null;
        });
    }
    return null;
}

// Display Online Status
function displayOnlineStatus(recipientId) {
    if (!recipientId) return;
    db.collection("Particulars").doc(recipientId).onSnapshot(doc => {
        if (doc.exists) {
            const status = doc.data().online;
            if (status) {
                chatStatusElement.textContent = "Online";
                chatStatusElement.style.color = "green";
            } else {
                chatStatusElement.textContent = "Offline";
                chatStatusElement.style.color = "gray";
            }
        }
    }, error => {
        console.error("Error fetching online status:", error);
    });
}

// Reset Unread Count
function resetUnreadCount(chatId) {
    db.collection("Particulars").doc(currentUser.uid).collection("chats").doc(chatId).update({
        unreadCount: 0
    }).catch(error => {
        console.error("Error resetting unread count:", error);
    });
}

// Search Users by Email
document.getElementById("search-button").addEventListener("click", () => {
    const email = prompt("Enter the email of the user you want to chat with:");
    if (email) {
        searchUserByEmail(email);
    }
});

function searchUserByEmail(email) {
    db.collection("Particulars").where("email", "==", email).get()
        .then(snapshot => {
            if (!snapshot.empty) {
                const userData = snapshot.docs[0].data();
                const userId = snapshot.docs[0].id;
                initiateChatWithUser(userId, userData);
            } else {
                alert("No user found with that email.");
            }
        })
        .catch(error => {
            console.error("Error searching user:", error);
        });
}

// Initiate Chat with User
function initiateChatWithUser(userId, userData) {
    // Check if a one-on-one chat already exists
    db.collection("Chats")
        .where("isGroup", "==", false)
        .where("members", "array-contains", currentUser.uid)
        .get()
        .then(snapshot => {
            let chatExists = false;
            snapshot.forEach(doc => {
                const chatMembers = doc.data().members;
                if (chatMembers.length === 2 && chatMembers.includes(userId)) {
                    // Chat exists
                    chatExists = true;
                    selectChat(doc.id, doc.data());
                }
            });

            if (!chatExists) {
                // Create a new chat
                createOneOnOneChat(userId, userData);
            }
        })
        .catch(error => {
            console.error("Error initiating chat:", error);
        });
}

// Create One-on-One Chat
function createOneOnOneChat(userId, userData) {
    const chatRef = db.collection("Chats").doc();
    const chatId = chatRef.id;

    const chatData = {
        chatId: chatId,
        chatName: userData.displayName || "Chat",
        chatAvatar: userData.profilePicture || "https://via.placeholder.com/150", // Default avatar URL
        isGroup: false,
        members: [currentUser.uid, userId],
        lastMessage: null,
        unreadCount: 0,
    };

    chatRef.set(chatData).then(() => {
        // Update chats for both users
        db.collection("Particulars").doc(currentUser.uid).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        db.collection("Particulars").doc(userId).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        alert("Chat created successfully.");
    }).catch(error => {
        console.error("Error creating chat:", error);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // New Chat Button is already handled above with search-button

    // Delete Chat Button
    deleteChatButton.addEventListener("click", () => {
        if (selectedChatId) {
            if (confirm("Are you sure you want to delete this chat?")) {
                db.collection("Chats").doc(selectedChatId).delete()
                    .then(() => {
                        // Remove chat from user's chat list
                        db.collection("Particulars").doc(currentUser.uid).update({
                            chats: firebase.firestore.FieldValue.arrayRemove(selectedChatId)
                        });
                        alert("Chat deleted successfully.");
                        // Reset chat window
                        selectedChatId = null;
                        chatHeader.style.display = "none";
                        document.getElementById("message-input-container").style.display = "none";
                        messageListElement.innerHTML = '';
                        noChatSelected.style.display = "flex";
                    })
                    .catch(error => {
                        console.error("Error deleting chat:", error);
                    });
            }
        }
    });

    // Close Settings Modal
    settingsCloseButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    // Handle Settings Form
    settingsForm.addEventListener("change", () => {
        const readReceipts = document.getElementById("read-receipts").checked;
        const lastActive = document.getElementById("last-active").checked;
        const timeFormat = document.getElementById("time-format").value;

        const settings = {
            readReceipts: readReceipts,
            lastActive: lastActive,
            timeFormat: timeFormat,
        };

        db.collection("Particulars").doc(currentUser.uid).update({
            settings: settings
        }).then(() => {
            console.log("Settings updated successfully.");
        }).catch(error => {
            console.error("Error updating settings:", error);
        });
    });

    // Close Modals when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
        if (event.target === scheduleMessageModal) {
            scheduleMessageModal.style.display = "none";
        }
    });
}

// Get User Settings (Simplified)
function getUserSettings() {
    let settings = {
        readReceipts: true,
        lastActive: true,
        timeFormat: '12',
    };

    db.collection("Particulars").doc(currentUser.uid).get()
        .then(doc => {
            if (doc.exists && doc.data().settings) {
                settings = doc.data().settings;
            }
        })
        .catch(error => {
            console.error("Error fetching user settings:", error);
        });

    return settings;
}

// Update User Online Status
function updateOnlineStatus(status) {
    db.collection("Particulars").doc(currentUser.uid).update({
        online: status,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(error => {
        console.error("Error updating online status:", error);
    });

    window.addEventListener("beforeunload", () => {
        db.collection("Particulars").doc(currentUser.uid).update({
            online: false,
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
}

// Handle Scheduled Messages (Persistence is optional)
let scheduledMessages = []; // Array to keep track of scheduled messages

// Listen for Scheduled Messages
function scheduleMessage(text, scheduledTime) {
    const delay = scheduledTime - Date.now();
    if (delay > 0) {
        const timeoutId = setTimeout(() => {
            sendScheduledMessage(text);
            // Remove from scheduledMessages array
            scheduledMessages = scheduledMessages.filter(msg => msg.timeoutId !== timeoutId);
        }, delay);
        // Store the timeout ID to manage scheduled messages if needed
        scheduledMessages.push({ text, scheduledTime, timeoutId });
    }
}

// Send Scheduled Message
function sendScheduledMessage(text) {
    if (selectedChatId) {
        const messageRef = db.collection("Chats").doc(selectedChatId).collection("messages").doc();
        const messageData = {
            messageId: messageRef.id,
            content: text,
            senderId: currentUser.uid,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            type: "text",
            read: false,
        };

        messageRef.set(messageData).then(() => {
            updateLastMessage(selectedChatId, messageData);
            alert("Scheduled message sent.");
        }).catch(error => {
            console.error("Error sending scheduled message:", error);
        });
    } else {
        alert("No chat selected. Scheduled message not sent.");
    }
}

// Load Scheduled Messages on Page Load
function loadScheduledMessages() {
    scheduledMessages.forEach(msg => {
        clearTimeout(msg.timeoutId);
        const delay = msg.scheduledTime - Date.now();
        if (delay > 0) {
            msg.timeoutId = setTimeout(() => {
                sendScheduledMessage(msg.text);
                scheduledMessages = scheduledMessages.filter(m => m.timeoutId !== msg.timeoutId);
            }, delay);
        } else {
            sendScheduledMessage(msg.text);
            scheduledMessages = scheduledMessages.filter(m => m.timeoutId !== msg.timeoutId);
        }
    });
}

// Listen for Typing Indicators
function setupTypingListener() {
    messageInput.addEventListener("input", () => {
        if (selectedChatId) {
            const typingRef = db.collection("Chats").doc(selectedChatId).collection("typing").doc(currentUser.uid);
            typingRef.set({
                isTyping: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            // Remove typing status after 2 seconds of inactivity
            setTimeout(() => {
                typingRef.delete();
            }, 2000);
        }
    });

    // Listen for typing indicators from other users
    db.collection("Chats").doc(selectedChatId).collection("typing")
        .onSnapshot(snapshot => {
            let isTyping = false;
            snapshot.forEach(doc => {
                if (doc.id !== currentUser.uid) {
                    isTyping = true;
                }
            });

            if (isTyping) {
                typingIndicator.style.display = "flex";
                typingText.textContent = "Someone is typing...";
            } else {
                typingIndicator.style.display = "none";
            }
        });
}

// Listen for Online Status
function setupOnlineStatusListener() {
    const recipientId = getRecipientId();
    if (recipientId) {
        db.collection("Particulars").doc(recipientId).onSnapshot(doc => {
            if (doc.exists) {
                const status = doc.data().online;
                if (status) {
                    chatStatusElement.textContent = "Online";
                    chatStatusElement.style.color = "green";
                } else {
                    chatStatusElement.textContent = "Offline";
                    chatStatusElement.style.color = "gray";
                }
            }
        }, error => {
            console.error("Error fetching online status:", error);
        });
    }
}

// Display Online Status
function displayOnlineStatus(recipientId) {
    if (!recipientId) return;
    db.collection("Particulars").doc(recipientId).onSnapshot(doc => {
        if (doc.exists) {
            const status = doc.data().online;
            if (status) {
                chatStatusElement.textContent = "Online";
                chatStatusElement.style.color = "green";
            } else {
                chatStatusElement.textContent = "Offline";
                chatStatusElement.style.color = "gray";
            }
        }
    }, error => {
        console.error("Error fetching online status:", error);
    });
}

// Reset Unread Count
function resetUnreadCount(chatId) {
    db.collection("Particulars").doc(currentUser.uid).collection("chats").doc(chatId).update({
        unreadCount: 0
    }).catch(error => {
        console.error("Error resetting unread count:", error);
    });
}

// Search Users by Email
function searchUserByEmail(email) {
    db.collection("Particulars").where("email", "==", email).get()
        .then(snapshot => {
            if (!snapshot.empty) {
                const userData = snapshot.docs[0].data();
                const userId = snapshot.docs[0].id;
                initiateChatWithUser(userId, userData);
            } else {
                alert("No user found with that email.");
            }
        })
        .catch(error => {
            console.error("Error searching user:", error);
        });
}

// Initiate Chat with User
function initiateChatWithUser(userId, userData) {
    // Check if a one-on-one chat already exists
    db.collection("Chats")
        .where("isGroup", "==", false)
        .where("members", "array-contains", currentUser.uid)
        .get()
        .then(snapshot => {
            let chatExists = false;
            snapshot.forEach(doc => {
                const chatMembers = doc.data().members;
                if (chatMembers.length === 2 && chatMembers.includes(userId)) {
                    // Chat exists
                    chatExists = true;
                    selectChat(doc.id, doc.data());
                }
            });

            if (!chatExists) {
                // Create a new chat
                createOneOnOneChat(userId, userData);
            }
        })
        .catch(error => {
            console.error("Error initiating chat:", error);
        });
}

// Create One-on-One Chat
function createOneOnOneChat(userId, userData) {
    const chatRef = db.collection("Chats").doc();
    const chatId = chatRef.id;

    // Upload chat avatar if userData has a profilePicture
    let chatAvatarURL = "https://via.placeholder.com/150"; // Default avatar URL

    if (userData.profilePicture) {
        const chatAvatarRef = storage.ref(`images/chats/${chatId}.jpg`);
        storage.refFromURL(userData.profilePicture).getDownloadURL()
            .then(url => {
                // Download the user's profile picture and upload it as chat avatar
                return fetch(url);
            })
            .then(response => response.blob())
            .then(blob => {
                return storage.ref(`images/chats/${chatId}.jpg`).put(blob);
            })
            .then(() => {
                return storage.ref(`images/chats/${chatId}.jpg`).getDownloadURL();
            })
            .then(downloadURL => {
                chatAvatarURL = downloadURL;
                // Create chat data
                const chatData = {
                    chatId: chatId,
                    chatName: userData.displayName || "Chat",
                    chatAvatar: chatAvatarURL,
                    isGroup: false,
                    members: [currentUser.uid, userId],
                    lastMessage: null,
                    unreadCount: 0,
                };

                return chatRef.set(chatData);
            })
            .then(() => {
                // Update chats for both users
                db.collection("Particulars").doc(currentUser.uid).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(chatId)
                });
                db.collection("Particulars").doc(userId).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(chatId)
                });
                alert("Chat created successfully.");
            })
            .catch(error => {
                console.error("Error creating chat:", error);
            });
    } else {
        // If no profile picture, use default
        const chatData = {
            chatId: chatId,
            chatName: userData.displayName || "Chat",
            chatAvatar: chatAvatarURL,
            isGroup: false,
            members: [currentUser.uid, userId],
            lastMessage: null,
            unreadCount: 0,
        };

        chatRef.set(chatData).then(() => {
            // Update chats for both users
            db.collection("Particulars").doc(currentUser.uid).update({
                chats: firebase.firestore.FieldValue.arrayUnion(chatId)
            });
            db.collection("Particulars").doc(userId).update({
                chats: firebase.firestore.FieldValue.arrayUnion(chatId)
            });
            alert("Chat created successfully.");
        }).catch(error => {
            console.error("Error creating chat:", error);
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Delete Chat Button is already handled above

    // Close Settings Modal
    settingsCloseButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    // Handle Settings Form
    settingsForm.addEventListener("change", () => {
        const readReceipts = document.getElementById("read-receipts").checked;
        const lastActive = document.getElementById("last-active").checked;
        const timeFormat = document.getElementById("time-format").value;

        const settings = {
            readReceipts: readReceipts,
            lastActive: lastActive,
            timeFormat: timeFormat,
        };

        db.collection("Particulars").doc(currentUser.uid).update({
            settings: settings
        }).then(() => {
            console.log("Settings updated successfully.");
        }).catch(error => {
            console.error("Error updating settings:", error);
        });
    });

    // Close Modals when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
        if (event.target === scheduleMessageModal) {
            scheduleMessageModal.style.display = "none";
        }
    });

    // Schedule Message Button
    scheduleMessageButton.addEventListener("click", () => {
        scheduleMessageModal.style.display = "block";
        // Set the minimum date and time to now
        scheduledTimeInput.min = new Date().toISOString().slice(0, -8);
    });

    // Close Schedule Message Modal
    scheduleCloseButton.addEventListener("click", () => {
        scheduleMessageModal.style.display = "none";
    });
}

// Get User Settings (Simplified)
function getUserSettings() {
    let settings = {
        readReceipts: true,
        lastActive: true,
        timeFormat: '12',
    };

    db.collection("Particulars").doc(currentUser.uid).get()
        .then(doc => {
            if (doc.exists && doc.data().settings) {
                settings = doc.data().settings;
            }
        })
        .catch(error => {
            console.error("Error fetching user settings:", error);
        });

    return settings;
}

// Update User Online Status
function updateOnlineStatus(status) {
    db.collection("Particulars").doc(currentUser.uid).update({
        online: status,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(error => {
        console.error("Error updating online status:", error);
    });

    window.addEventListener("beforeunload", () => {
        db.collection("Particulars").doc(currentUser.uid).update({
            online: false,
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
}

// Scheduled Messages Handling is already implemented above

// In-App Notifications (Optional Enhancement)
function showToast(message) {
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.classList.add("toast-notification");
    toast.innerText = message;
    document.body.appendChild(toast);

    // Toast styles
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#007bff";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.5s ease";
    toast.style.zIndex = "10000";

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}
