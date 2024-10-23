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
    price decimal(10,2),
    trainer varchar(100)
);

insert into bookings (coursename, coursecode, status, dateoflesson, mode, picture, price, trainer) values 
    ('Web Application 2', 'IS216', 'pending', '2024-08-21', 'physical', 'IS216.jpg', 80.00, "Zenny Goh"),
    ('Introduction to Programming', 'CS101', 'confirmed', '2024-07-15', 'online', 'CS101.jpg', 120.00, "Chrispy Choo"),
    ('Database Systems', 'IS102', 'pending', '2024-09-05', 'physical', 'IS102.jpg', 150.00, "Zenny Goh"),
    ('Advanced Networking', 'NET305', 'canceled', '2024-10-12', 'online', 'NET305.jpg', 200.00, "Han Sum Ziwei"),
    ('Machine Learning', 'ML201', 'confirmed', '2024-11-01', 'physical', 'ML201.jpg', 300.00, "Yi Chi"),
    ('Cloud Computing', 'CC204', 'pending', '2024-08-25', 'online', 'CC204.jpg', 250.00, "Cloudy Ng");