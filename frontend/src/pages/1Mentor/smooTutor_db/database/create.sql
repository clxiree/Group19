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