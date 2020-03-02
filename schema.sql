-- mysql -u root < schema.sql

DROP DATABASE IF EXISTS socialclub;

CREATE DATABASE socialclub;

USE socialclub;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) ,
  `email` varchar(40) UNIQUE
); 

CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `time` varchar(20),
  `category_id` int,
  `category` varchar(20),
  `location` varchar(50),
  `creator_id` int,
  `summary` varchar(244),
  `roomID` varchar(20)
);

CREATE TABLE `status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status` varchar(20)
);

CREATE TABLE `rsvp_status` (
  `eventid` int,
  `userid` int,
  `status` int
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(20)
);



ALTER TABLE `events` ADD FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

ALTER TABLE `rsvp_status` ADD FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

ALTER TABLE `rsvp_status` ADD FOREIGN KEY (`eventid`) REFERENCES `events` (`id`);

ALTER TABLE `rsvp_status` ADD FOREIGN KEY (`status`) REFERENCES `categories` (`id`);