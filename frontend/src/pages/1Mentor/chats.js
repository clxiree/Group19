// scripts/script.js

// Initialize Firebase
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
let typingListener = null;
let onlineStatusListener = null;
let scheduledMessages = [];

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
const settingsButton = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const settingsCloseButton = document.getElementById("settings-close-button");
const settingsForm = document.getElementById("settings-form");
const deleteChatButton = document.getElementById("delete-chat-button");
const noChatSelected = document.getElementById("no-chat-selected");

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

// Handle Authentication State
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        initializeChatApp();
    } else {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
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
}

// Fetch User Profile
function fetchUserProfile() {
    const userRef = db.collection("Users").doc(currentUser.uid);
    userRef.get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            if (userData.displayName) {
                // You can display the user's name somewhere if needed
            }
            if (userData.profilePicture) {
                // Update profile picture if needed
            }
        }
    }).catch(error => {
        console.error("Error fetching user profile:", error);
    });
}

// Fetch Chats
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

    const avatarSrc = chatData.chatAvatar || "assets/img/default-avatar.png";
    chatItem.innerHTML = `
      <img src="${avatarSrc}" alt="Avatar" class="rounded-circle me-2" width="50" height="50">
      <div class="chat-item-info">
        <div class="chat-item-name">${chatData.chatName || "Chat"}</div>
        <div class="chat-item-last-message">${chatData.lastMessage ? (chatData.lastMessage.type === 'text' ? chatData.lastMessage.content : '📎 Attachment') : ''}</div>
      </div>
      ${chatData.unreadCount > 0 ? `<span class="unread-count">${chatData.unreadCount}</span>` : ''}
    `;

    chatItem.addEventListener("click", () => selectChat(chatId, chatData));
    chatListElement.appendChild(chatItem);
}

// Select Chat
function selectChat(chatId, chatData) {
    if (selectedChatId === chatId) return; // If the same chat is selected, do nothing

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
    chatAvatarElement.src = chatData.chatAvatar || "assets/img/default-avatar.png";

    // Display Online Status
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

    // Listen for new messages
    listenForNewMessages(chatId);
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

    // Replace :emoji_name: with emoji characters using Emoji Button library
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
        }
    }).then(() => {
        // Optionally, you can handle additional logic here
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
            const fileRef = storage.ref(`chat_files/${selectedChatId}/${file.name}`);
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
function sendFileMessage(downloadURL, fileName, fileType) {
    const messageRef = db.collection("Chats").doc(selectedChatId).collection("messages").doc();
    const messageData = {
        messageId: messageRef.id,
        content: downloadURL,
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

// Listen for New Messages to Show Notifications
function listenForNewMessages(chatId) {
    db.collection("Chats").doc(chatId).collection("messages")
        .orderBy("sentAt", "desc")
        .limit(1)
        .onSnapshot(snapshot => {
            if (!snapshot.empty) {
                const messageData = snapshot.docs[0].data();
                if (messageData.senderId !== currentUser.uid) {
                    showToast(`New message from ${messageData.senderId === currentUser.uid ? "You" : "Someone"}`);
                }
            }
        }, error => {
            console.error("Error listening for new messages:", error);
        });
}

// Show Toast Notification
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

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Reset Unread Count
function resetUnreadCount(chatId) {
    const chatRef = db.collection("Chats").doc(chatId);
    chatRef.update({
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
    db.collection("Users").where("email", "==", email).get()
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
        chatAvatar: userData.profilePicture || "assets/img/default-avatar.png",
        isGroup: false,
        members: [currentUser.uid, userId],
        lastMessage: null,
        unreadCount: 0,
    };

    chatRef.set(chatData).then(() => {
        // Update chats for both users
        db.collection("Users").doc(currentUser.uid).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        db.collection("Users").doc(userId).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        alert("Chat created successfully.");
    }).catch(error => {
        console.error("Error creating chat:", error);
    });
}

// Create Group Chat
// You can implement a separate UI for creating group chats as needed

// Setup Event Listeners
function setupEventListeners() {
    // New Chat Button
    newChatButton.addEventListener("click", () => {
        const email = prompt("Enter the email of the user you want to chat with:");
        if (email) {
            searchUserByEmail(email);
        }
    });

    // Delete Chat Button
    deleteChatButton.addEventListener("click", () => {
        if (selectedChatId) {
            if (confirm("Are you sure you want to delete this chat?")) {
                db.collection("Chats").doc(selectedChatId).delete()
                    .then(() => {
                        // Remove chat from user's chat list
                        db.collection("Users").doc(currentUser.uid).update({
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

    // Settings Button
    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "block";
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

        db.collection("Users").doc(currentUser.uid).update({
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

// Get User Settings
function getUserSettings() {
    const userSettings = {
        readReceipts: true,
        lastActive: true,
        timeFormat: '12',
    };

    db.collection("Users").doc(currentUser.uid).get()
        .then(doc => {
            if (doc.exists && doc.data().settings) {
                return doc.data().settings;
            } else {
                return userSettings;
            }
        })
        .then(settings => {
            // Apply settings as needed
        })
        .catch(error => {
            console.error("Error fetching user settings:", error);
        });

    return userSettings;
}

// Display Online Status
function displayOnlineStatus(otherUserId) {
    const statusRef = db.collection("Users").doc(otherUserId).collection("status").doc("currentStatus");
    statusRef.onSnapshot(doc => {
        if (doc.exists) {
            const statusData = doc.data();
            if (statusData.state === "online") {
                chatStatusElement.textContent = "Online";
                chatStatusElement.style.color = "green";
            } else {
                const lastActive = statusData.lastChanged.toDate();
                chatStatusElement.textContent = `Last active: ${formatTimestamp(statusData.lastChanged)}`;
                chatStatusElement.style.color = "gray";
            }
        } else {
            chatStatusElement.textContent = "Offline";
            chatStatusElement.style.color = "gray";
        }
    }, error => {
        console.error("Error fetching online status:", error);
    });
}

// Update User Online Status
function updateOnlineStatus() {
    const statusRef = db.collection("Users").doc(currentUser.uid).collection("status").doc("currentStatus");
    const isOnline = {
        state: "online",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const isOffline = {
        state: "offline",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    };

    auth.onAuthStateChanged(user => {
        if (user) {
            statusRef.set(isOnline);

            window.addEventListener("beforeunload", () => {
                statusRef.set(isOffline);
            });
        }
    });
}

// Setup Typing Listener
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

// Setup Online Status Listener
function setupOnlineStatusListener() {
    // Listen to changes in user status
    // This can be implemented similarly to typing indicators
}

// Schedule Messages Persistence (Optional)
function loadScheduledMessages() {
    // Implement persistence for scheduled messages if needed
    // For example, fetch scheduled messages from Firestore and set timeouts
}

// Handle Scheduled Messages (Cloud Functions Recommended)
function handleScheduledMessages() {
    // For reliability, use Firebase Cloud Functions to handle scheduled messages
    // Client-side scheduling is not reliable as it depends on the user's browser being open
}

// Group Chat Functionality
function createGroupChat(groupName, memberEmails) {
    // Fetch user IDs from emails
    const memberPromises = memberEmails.map(email => {
        return db.collection("Users").where("email", "==", email).get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    return snapshot.docs[0].id;
                } else {
                    alert(`No user found with email: ${email}`);
                    return null;
                }
            });
    });

    Promise.all(memberPromises).then(memberIds => {
        const validMemberIds = memberIds.filter(id => id !== null);
        if (validMemberIds.length === 0) {
            alert("No valid members to add to the group.");
            return;
        }

        // Create group chat
        const chatRef = db.collection("Chats").doc();
        const chatId = chatRef.id;

        const chatData = {
            chatId: chatId,
            chatName: groupName,
            chatAvatar: "assets/img/default-group-avatar.png",
            isGroup: true,
            members: [currentUser.uid, ...validMemberIds],
            lastMessage: null,
            unreadCount: 0,
        };

        chatRef.set(chatData).then(() => {
            // Add chat to each member's chat list
            [currentUser.uid, ...validMemberIds].forEach(uid => {
                db.collection("Users").doc(uid).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(chatId)
                });
            });
            alert("Group chat created successfully.");
        }).catch(error => {
            console.error("Error creating group chat:", error);
        });
    }).catch(error => {
        console.error("Error fetching group members:", error);
    });
}

// Initiate Group Chat Creation (You can implement a UI for this)
function initiateGroupChat() {
    const groupName = prompt("Enter group name:");
    if (!groupName) return;

    const memberEmails = prompt("Enter member emails separated by commas:").split(",").map(email => email.trim());
    if (memberEmails.length === 0) return;

    createGroupChat(groupName, memberEmails);
}

// Optionally, add a button to create group chats and attach the listener
const createGroupChatButton = document.getElementById("create-group-chat-button");
if (createGroupChatButton) {
    createGroupChatButton.addEventListener("click", initiateGroupChat);
}

// Handle User Online Status
updateOnlineStatus();

// Search Users by Email (Optional: Implement a search bar UI)
function searchUserByEmail(email) {
    db.collection("Users").where("email", "==", email).get()
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
        chatAvatar: userData.profilePicture || "assets/img/default-avatar.png",
        isGroup: false,
        members: [currentUser.uid, userId],
        lastMessage: null,
        unreadCount: 0,
    };

    chatRef.set(chatData).then(() => {
        // Update chats for both users
        db.collection("Users").doc(currentUser.uid).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        db.collection("Users").doc(userId).update({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        });
        alert("Chat created successfully.");
    }).catch(error => {
        console.error("Error creating chat:", error);
    });
}

// Setup Typing Listener
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
    // You can implement additional listeners if needed
}

// Handle Scheduled Messages (Client-Side Scheduling)
function handleScheduledMessages() {
    // Note: For production, use Firebase Cloud Functions to handle scheduled messages
    // Client-side scheduling is unreliable as it depends on the user's browser being open
}

// Additional Helper Functions

// Show Toast Notification
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

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Emoji Handling is managed via the Emoji Picker library

// Initialize Scheduled Message Minimum Time
document.addEventListener("DOMContentLoaded", () => {
    const scheduledTimeInput = document.getElementById("scheduled-time");
    if (scheduledTimeInput) {
        scheduledTimeInput.min = new Date().toISOString().slice(0, -8);
    }
});
