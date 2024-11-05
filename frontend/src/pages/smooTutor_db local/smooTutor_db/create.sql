-- Create the database
DROP DATABASE IF EXISTS smooTutor_db;
CREATE DATABASE smooTutor_db;
USE smooTutor_db;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create the Chats table
CREATE TABLE IF NOT EXISTS Chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    is_group_chat BOOLEAN DEFAULT FALSE,
    chat_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create the ChatParticipants table
CREATE TABLE IF NOT EXISTS ChatParticipants (
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    last_read_message_id INT DEFAULT NULL,
    PRIMARY KEY (chat_id, user_id),
    FOREIGN KEY (chat_id) REFERENCES Chats(chat_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the Messages table
CREATE TABLE IF NOT EXISTS Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    sender_id INT,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES Chats(chat_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert users
INSERT INTO Users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'password_hash1'),
('bob', 'bob@example.com', 'password_hash2'),
('charlie', 'charlie@example.com', 'password_hash3');

-- Insert chats
INSERT INTO Chats (is_group_chat, chat_name) VALUES
(FALSE, NULL),                  -- Chat 1: Alice and Bob
(TRUE, 'Project Team');         -- Chat 2: Group Chat

-- Insert chat participants
-- Chat 1: Alice and Bob
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(1, 1),  -- Alice
(1, 2);  -- Bob

-- Chat 2: Project Team (Alice, Bob, Charlie)
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(2, 1),  -- Alice
(2, 2),  -- Bob
(2, 3);  -- Charlie

-- Insert messages
-- Messages for Chat 1
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(1, 1, 'Hi Bob, how are you?', '2024-08-01 10:00:00'),
(1, 2, 'I\'m good, Alice! How about you?', '2024-08-01 10:05:00');

-- Messages for Chat 2
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(2, 3, 'Hey team, let\'s meet tomorrow.', '2024-08-02 14:00:00'),
(2, 1, 'Sure, what time?', '2024-08-02 14:10:00'),
(2, 2, 'I\'m available after 3 PM.', '2024-08-02 14:15:00');

-- particulars
CREATE TABLE particulars (
    userid INTEGER NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    tutor VARCHAR(10) NOT NULL,
    tutee VARCHAR(10) NOT NULL,
    teachingcode VARCHAR(10) NULL,
    taughtcode VARCHAR(10) NULL,
    numberofreviews VARCHAR(30)  NULL,
    oneliner VARCHAR(4000) NULL,
    about VARCHAR(4000) NULL,
    tutorrating VARCHAR(10) NULL,
    tuteerating VARCHAR(10) NULL,
    qualifications VARCHAR(100) NULL,
    rate VARCHAR(100) NULL,
    lessondesc VARCHAR(4000) NULL,
    portfolio VARCHAR(100) NULL,
    joineddate DATE NULL
);


INSERT INTO particulars 
(userid, username, tutor, tutee, teachingcode, taughtcode, numberofreviews, oneliner, about, tutorrating, tuteerating, qualifications, rate, lessondesc, portfolio, joineddate) 
VALUES 
    (1, 'Chrispy Choo', '1', '0', 'CC204, IS216, IS111', NULL, '30', 'I am the best tutor you can ever have.', 'I am an expert tutor in modern web technologies with a focus on interactive design.', '4.0', NULL, 'CC204 A, WAD2 A+, IS111 A', '$40/h', 'Covers basic to advanced programming concepts.', 'portfolio1.jpg', '2023-09-05'),
    (2, 'Zenny Potato', '1', '1', 'CS101', 'IS216', '25', 'Learning made fun and easy by me!', 'I am super patient and all my students love me.', '2.0', NULL, 'CS101 A', '$45/h', 'I share my notes and teach using them.', 'portfolio2.jpg', '2023-10-15'),
    (3, 'Han Sum Wei', '1', '0', 'IS113', NULL, '10', 'I am a Database guru.', 'I am called han sum for a reason. Poepl also all me Smart Wei.', '4.0', NULL, 'IS113 A+', '$39/h', 'I explain with visuals.', 'portfolio3.jpg', '2024-01-05'),
    (4, 'YiChy Nose', '1', '0', 'ML201', NULL, '17', 'My brain is always YiChy for more knowledge', 'I am a AI and machine learning specialist with a focus on real-world applications.', '3.0', NULL, 'ML201 A-', '$36/h', 'I can help you explore machine learning algorithms and their applications.', 'portfolio4.jpg', '2024-01-01'),
    (5, 'Cloudy Ng', '1', '0', 'CC204', NULL, '20', 'I love teaching Cloud computing.', 'I am a inspiring Cloud architect helping businesses scale and secure their cloud solutions.', '5.0', NULL, 'CC204 A', '$42/h', 'I can help you leverage cloud platforms for business efficiency.', 'portfolio5.jpg', '2023-12-25');

