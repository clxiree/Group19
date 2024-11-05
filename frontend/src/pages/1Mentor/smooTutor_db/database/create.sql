drop database if exists smooTutor_db;
create database smooTutor_db;
use smooTutor_db;

-- bookings
create table bookings (
    id integer auto_increment primary key,
    coursename varchar(100),
    coursecode varchar(10),
    status varchar(30),
    dateoflesson date,
    mode varchar(30),
    picture varchar(100),
    price decimal(10,2)
);

insert into bookings (coursename, coursecode, status, dateoflesson, mode, picture, price) values 
    ('web app 2', 'is216', 'pending', '2024-08-21', 'physical', 'test.jpg', 80.00),
    ('Introduction to Programming', 'CS101', 'confirmed', '2024-07-15', 'online', 'prog.jpg', 120.00),
    ('Database Systems', 'IS102', 'pending', '2024-09-05', 'physical', 'db.jpg', 150.00),
    ('Advanced Networking', 'NET305', 'canceled', '2024-10-12', 'online', 'network.jpg', 200.00),
    ('Machine Learning', 'ML201', 'confirmed', '2024-11-01', 'physical', 'ml.jpg', 300.00),
    ('Cloud Computing', 'CC204', 'pending', '2024-08-25', 'online', 'cloud.jpg', 250.00);



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
