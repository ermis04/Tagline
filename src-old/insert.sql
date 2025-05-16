INSERT INTO Person VALUES
(1, 'Alice', 'Wong', 'alicew', 'alice@example.com', 'pass123', '2025-03-14', 'User'),
(2, 'Bob', 'Smith', 'bobmod', 'bob@example.com', 'mod123', '2025-02-01', 'Moderator'),
(3, 'Charlie', 'Green', 'charlieg', 'charlie@example.com', 'partner123', '2025-03-23', 'Partner'),
(4, 'Dana', 'White', 'danaw', 'dana@example.com', 'pass123', '2025-04-04', 'User'),
(5, 'Evan', 'Brown', 'evanb', 'evan@example.com', 'pass123', '2025-01-27', 'User');

INSERT INTO User VALUES
(1, 150),
(4, 100),
(5, 200);

INSERT INTO Moderator VALUES
(2);

INSERT INTO Partner VALUES
(3, 'Adventure Co.', 2000.0, '555-9876', 'partner@adventureco.com', 'partner123');

INSERT INTO Location VALUES
(10, 'Breathtaking mountain trail', 'Skyline Ridge'),
(11, 'Forest with waterfalls', 'Whispering Woods'),
(12, 'City park and picnic area', 'Maple Grove'),
(13, 'Historic downtown spot', 'Old Market'),
(14, 'Secluded lakeside path', 'Tranquil Lake');

INSERT INTO POI VALUES
(100, 'Eagle Point', 10, 50),
(101, 'Crystal Falls', 11, 40),
(102, 'Picnic Plaza', 12, 20),
(103, 'Old Clock Tower', 13, 30),
(104, 'Sunset Dock', 14, 25);

INSERT INTO suggestedPOI VALUES
(1, 'Starlight Peak', 10, 'Great for night hikes.', 1, 2, '2025-03-31', NULL),
(2, 'Mossy Creek', 11, 'Perfect picnic spot.', 4, 2, '2025-03-14', NULL),
(3, 'Hidden Cove', 14, 'Secluded lake view.', 5, 2, '2025-04-30', NULL),
(4, 'Birdwatch Alley', 12, 'Ideal for birders.', 1, 2, '2025-04-17', 'Too urban.'),
(5, 'Sunny Field', 13, 'Open field for events.', 4, 2, '2025-05-01', NULL);

INSERT INTO Post VALUES
(1000, 1, 'Sunset was unreal! #Skyline', 'sun1.jpg', '2025-03-21', NULL, 100),
(1001, 4, 'Beautiful falls today.', 'falls.jpg', '2025-01-30', NULL, 101),
(1002, 5, 'Chilled by the lake.', 'lake.jpg', '2025-04-26', NULL, 104),
(1003, 1, 'Picnic was fun!', 'picnic.jpg', '2025-02-17', NULL, 102),
(1004, 4, 'Historic vibes.', 'clock.jpg', '2025-02-18', NULL, 103);

INSERT INTO Review VALUES
(2000, 1, 5, 'Breathtaking view!', 100, '2025-03-26', NULL),
(2001, 4, 4, 'Loved the quiet.', 101, '2025-04-28', NULL),
(2002, 5, 3, 'Could be cleaner.', 104, '2025-03-28', NULL),
(2003, 1, 5, 'Perfect spot for lunch.', 102, '2025-03-25', NULL),
(2004, 4, 4, 'Charming old town.', 103, '2025-02-11', NULL);

INSERT INTO Comment VALUES
(1, 1000, 'Totally agree!', '2025-02-28'),
(4, 1001, 'So cool!', '2025-02-20'),
(5, 1002, 'Relaxing view!', '2025-02-07'),
(1, 1003, 'Nice picnic setup!', '2025-03-21'),
(4, 1004, 'Love old buildings.', '2025-03-14');

INSERT INTO Event VALUES
(3000, 100, '2025-04-19', '2025-04-24', 'Photography Workshop', 'event1.jpg', 2, 3),
(3001, 101, '2025-03-24', '2025-03-17', 'Fall Hike', 'event2.jpg', 2, 3),
(3002, 102, '2025-02-10', '2025-04-08', 'Community Picnic', 'event3.jpg', 2, 3),
(3003, 103, '2025-04-14', '2025-05-02', 'History Tour', 'event4.jpg', 2, 3),
(3004, 104, '2025-04-11', '2025-04-24', 'Evening Meditation', 'event5.jpg', 2, 3);

INSERT INTO Participate VALUES
(1, 3000, '2025-02-17'),
(4, 3001, '2025-03-10'),
(5, 3002, '2025-02-06'),
(1, 3003, '2025-02-20'),
(4, 3004, '2025-04-25');

INSERT INTO Friends VALUES
(1, 1, 4, 'Accepted'),
(2, 1, 5, 'Accepted'),
(3, 4, 5, 'Pending'),
(4, 5, 1, 'Accepted'),
(5, 4, 1, 'Accepted');

INSERT INTO Visit VALUES
(1, 100, '2025-01-24'),
(4, 101, '2025-04-06'),
(5, 102, '2025-01-25'),
(1, 103, '2025-04-07'),
(4, 104, '2025-04-28');

INSERT INTO Ad VALUES
(4000, 3, 'Hike Eagle Point this weekend!', '2025-03-13', '2025-01-29', 'Approved', 100.0, 100),
(4001, 3, 'Fall views at Crystal Falls!', '2025-04-16', '2025-03-07', 'Approved', 80.0, 101),
(4002, 3, 'Community Picnic promo', '2025-04-13', '2025-02-14', 'Approved', 60.0, 102),
(4003, 3, 'Tour the Clock Tower', '2025-03-09', '2025-04-28', 'Rejected', 50.0, 103),
(4004, 3, 'Meditation at the Dock', '2025-03-23', '2025-02-27', 'Approved', 70.0, 104);

INSERT INTO Sponsorship VALUES
(5000, 3, 3000),
(5001, 3, 3001),
(5002, 3, 3002),
(5003, 3, 3003),
(5004, 3, 3004);
