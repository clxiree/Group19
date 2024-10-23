-- Create the database and use it
CREATE DATABASE IF NOT EXISTS chat_app;
USE chat_app;

-- Drop existing tables if they exist (optional, for clean setup)
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS ChatParticipants;
DROP TABLE IF EXISTS Chats;
DROP TABLE IF EXISTS Users;

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
    chat_id INT,
    user_id INT,
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

-- Insert 20 users into the Users table
INSERT INTO Users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'password_hash1'),
('bob', 'bob@example.com', 'password_hash2'),
('charlie', 'charlie@example.com', 'password_hash3'),
('dave', 'dave@example.com', 'password_hash4'),
('eve', 'eve@example.com', 'password_hash5'),
('frank', 'frank@example.com', 'password_hash6'),
('grace', 'grace@example.com', 'password_hash7'),
('heidi', 'heidi@example.com', 'password_hash8'),
('ivan', 'ivan@example.com', 'password_hash9'),
('judy', 'judy@example.com', 'password_hash10'),
('mallory', 'mallory@example.com', 'password_hash11'),
('oscar', 'oscar@example.com', 'password_hash12'),
('peggy', 'peggy@example.com', 'password_hash13'),
('trent', 'trent@example.com', 'password_hash14'),
('victor', 'victor@example.com', 'password_hash15'),
('wendy', 'wendy@example.com', 'password_hash16'),
('xavier', 'xavier@example.com', 'password_hash17'),
('yvonne', 'yvonne@example.com', 'password_hash18'),
('zach', 'zach@example.com', 'password_hash19'),
('sybil', 'sybil@example.com', 'password_hash20');

-- Insert chats into the Chats table
INSERT INTO Chats (is_group_chat, chat_name) VALUES
(FALSE, NULL),                  -- Chat 1: Alice and Bob
(FALSE, NULL),                  -- Chat 2: Charlie and Dave
(TRUE, 'Study Group'),          -- Chat 3: Alice, Bob, Charlie, Dave
(TRUE, 'Project Team'),         -- Chat 4: Eve, Frank, Grace, Heidi
(FALSE, NULL),                  -- Chat 5: Mallory and Trent
(TRUE, 'All Hands Meeting'),    -- Chat 6: All Users
(FALSE, NULL),                  -- Chat 7: Peggy and Victor
(FALSE, NULL),                  -- Chat 8: Wendy and Xavier
(FALSE, NULL);                  -- Chat 9: Yvonne and Zach

-- Insert participants into ChatParticipants

-- Chat 1: Alice and Bob
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(1, 1),  -- Alice
(1, 2);  -- Bob

-- Chat 2: Charlie and Dave
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(2, 3),  -- Charlie
(2, 4);  -- Dave

-- Chat 3: Study Group (Alice, Bob, Charlie, Dave)
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(3, 1),  -- Alice
(3, 2),  -- Bob
(3, 3),  -- Charlie
(3, 4);  -- Dave

-- Chat 4: Project Team (Eve, Frank, Grace, Heidi)
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(4, 5),  -- Eve
(4, 6),  -- Frank
(4, 7),  -- Grace
(4, 8);  -- Heidi

-- Chat 5: Mallory and Trent
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(5, 11), -- Mallory
(5, 14); -- Trent

-- Chat 6: All Hands Meeting (All Users)
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(6, 1),  (6, 2),  (6, 3),  (6, 4),  (6, 5),
(6, 6),  (6, 7),  (6, 8),  (6, 9),  (6,10),
(6,11),  (6,12),  (6,13),  (6,14),  (6,15),
(6,16),  (6,17),  (6,18),  (6,19),  (6,20);

-- Chat 7: Peggy and Victor
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(7, 13), -- Peggy
(7, 15); -- Victor

-- Chat 8: Wendy and Xavier
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(8, 16), -- Wendy
(8, 17); -- Xavier

-- Chat 9: Yvonne and Zach
INSERT INTO ChatParticipants (chat_id, user_id) VALUES
(9, 18), -- Yvonne
(9, 19); -- Zach

-- Insert messages into Messages table

-- Messages for Chat 1: Alice (1) and Bob (2)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(1, 1, 'Hi Bob! How are you?', '2023-10-01 09:00:00'),
(1, 2, 'Hey Alice! I\'m doing well. How about you?', '2023-10-01 09:05:00'),
(1, 1, 'I\'m great, thanks for asking. Are you ready for the exam tomorrow?', '2023-10-01 09:10:00'),
(1, 2, 'Almost ready. Just need to review a few more topics.', '2023-10-01 09:15:00'),
(1, 1, 'Let me know if you want to study together later.', '2023-10-01 09:20:00'),
(1, 2, 'Sure, that would be helpful. Thanks!', '2023-10-01 09:25:00'),
(1, 2, 'Hey Alice, are we still on for the study session?', '2023-10-01 15:00:00'),
(1, 1, 'Yes, I\'ll be at the café at 5 PM.', '2023-10-01 15:05:00'),
(1, 2, 'Great, see you there!', '2023-10-01 15:10:00'),
(1, 1, 'Don\'t forget to bring the notes from last class.', '2023-10-01 15:15:00'),
(1, 2, 'Will do!', '2023-10-01 15:20:00');

-- Messages for Chat 2: Charlie (3) and Dave (4)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(2, 3, 'Dave, did you complete the assignment?', '2023-10-02 14:00:00'),
(2, 4, 'Not yet, Charlie. Planning to finish it tonight.', '2023-10-02 14:05:00'),
(2, 3, 'Don\'t forget, it\'s due tomorrow morning.', '2023-10-02 14:10:00'),
(2, 4, 'Thanks for the reminder!', '2023-10-02 14:15:00');

-- Messages for Chat 3: Study Group (Alice, Bob, Charlie, Dave)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(3, 1, 'Hey everyone, should we meet up to review the material?', '2023-10-03 16:00:00'),
(3, 3, 'I\'m in! What time works for everyone?', '2023-10-03 16:05:00'),
(3, 2, 'How about 6 PM at the library?', '2023-10-03 16:10:00'),
(3, 4, 'Works for me!', '2023-10-03 16:15:00'),
(3, 1, 'Great, see you all then!', '2023-10-03 16:20:00'),
(3, 4, 'I might be a bit late to the study group.', '2023-10-03 17:00:00'),
(3, 2, 'No worries, we can start with some review questions.', '2023-10-03 17:05:00'),
(3, 1, 'I\'ll bring some snacks.', '2023-10-03 17:10:00'),
(3, 3, 'Awesome!', '2023-10-03 17:15:00');

-- Messages for Chat 4: Project Team (Eve, Frank, Grace, Heidi)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(4, 5, 'Team, we need to finalize our project proposal.', '2023-10-04 10:00:00'),
(4, 6, 'I can work on the introduction section.', '2023-10-04 10:05:00'),
(4, 7, 'I\'ll handle the methodology.', '2023-10-04 10:10:00'),
(4, 8, 'I can take care of the conclusion and references.', '2023-10-04 10:15:00'),
(4, 5, 'Perfect! Let\'s aim to have a draft by Friday.', '2023-10-04 10:20:00'),
(4, 6, 'I have some ideas for the introduction.', '2023-10-04 11:00:00'),
(4, 5, 'Let\'s discuss them in our meeting tomorrow.', '2023-10-04 11:05:00'),
(4, 7, 'I\'ve uploaded the methodology draft to the shared folder.', '2023-10-04 11:10:00'),
(4, 8, 'I\'ll review it this afternoon.', '2023-10-04 11:15:00');

-- Messages for Chat 5: Mallory (11) and Trent (14)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(5, 11, 'Trent, are you available for a quick call?', '2023-10-05 13:00:00'),
(5, 14, 'Sure, give me 10 minutes.', '2023-10-05 13:02:00'),
(5, 11, 'Thanks!', '2023-10-05 13:05:00');

-- Messages for Chat 6: All Hands Meeting (All Users)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(6, 15, 'Hello everyone, welcome to the monthly meeting.', '2023-10-06 09:00:00'),
(6, 16, 'Good morning!', '2023-10-06 09:02:00'),
(6, 17, 'Morning!', '2023-10-06 09:03:00'),
(6, 18, 'Excited to hear the updates.', '2023-10-06 09:05:00'),
(6, 19, 'Let\'s get started.', '2023-10-06 09:07:00'),
(6, 20, 'I have a question about the new policy.', '2023-10-06 09:10:00'),
(6, 15, 'Sure, we\'ll cover that in the Q&A session.', '2023-10-06 09:12:00'),
(6, 9, 'Can we get an update on the new project timelines?', '2023-10-06 09:15:00'),
(6, 15, 'Yes, that\'s on the agenda.', '2023-10-06 09:17:00'),
(6, 10, 'Looking forward to the team-building activities.', '2023-10-06 09:20:00'),
(6, 12, 'Me too!', '2023-10-06 09:22:00');

-- Messages for Chat 7: Peggy (13) and Victor (15)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(7, 13, 'Victor, can you help me with the code review?', '2023-10-07 10:00:00'),
(7, 15, 'Sure, send me the code.', '2023-10-07 10:05:00'),
(7, 13, 'Just emailed it to you.', '2023-10-07 10:10:00'),
(7, 15, 'Got it. I\'ll get back to you soon.', '2023-10-07 10:15:00');

-- Messages for Chat 8: Wendy (16) and Xavier (17)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(8, 16, 'Xavier, did you finish the design mockups?', '2023-10-08 11:00:00'),
(8, 17, 'Yes, just uploaded them to the drive.', '2023-10-08 11:05:00'),
(8, 16, 'They look great! Thanks.', '2023-10-08 11:10:00');

-- Messages for Chat 9: Yvonne (18) and Zach (19)
INSERT INTO Messages (chat_id, sender_id, content, sent_at) VALUES
(9, 18, 'Zach, are you attending the workshop tomorrow?', '2023-10-09 14:00:00'),
(9, 19, 'Yes, are you?', '2023-10-09 14:05:00'),
(9, 18, 'I am. Maybe we can grab lunch afterward.', '2023-10-09 14:10:00'),
(9, 19, 'Sounds good!', '2023-10-09 14:15:00');
