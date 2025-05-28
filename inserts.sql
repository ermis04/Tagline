INSERT INTO Person (first_name, last_name, username, email, password, src, Role)
VALUES
    ('Alice', 'Johnson', 'alicej', 'alice@example.com', 'hashed_password1', '/images/alice.jpg', 'USER'),
    ('Bob', 'Smith', 'bobsmith', 'bob@example.com', 'hashed_password2', '/images/bob.jpg', 'USER'),
    ('Charlie', 'Lee', 'charlielee', 'charlie@example.com', 'hashed_password3', '/images/charlie.jpg', 'USER'),
    ('Diana', 'Miller', 'dianam', 'diana@example.com', 'hashed_password4', '/images/diana.jpg', 'USER'),
    ('Ethan', 'Brown', 'ethanb', 'ethan@example.com', 'hashed_password5', '/images/ethan.jpg', 'USER'),
    ('Fiona', 'Davis', 'fionad', 'fiona@example.com', 'hashed_password6', '/images/fiona.jpg', 'USER'),
    ('George', 'Wilson', 'georgew', 'george@example.com', 'hashed_password7', '/images/george.jpg', 'USER'),
    ('Hannah', 'Clark', 'hannahc', 'hannah@example.com', 'hashed_password8', '/images/hannah.jpg', 'USER'),
    ('Ian', 'Lopez', 'ianl', 'ian@example.com', 'hashed_password9', '/images/ian.jpg', 'USER');



INSERT INTO User (PersonID, points_collected) VALUES
      (1, 0),
      (2, 0),
      (3, 0),
      (4, 0),
      (5, 0),
      (6, 0),
      (7, 0),
      (8, 0),
      (9, 0);

INSERT INTO Moderator (PersonID) VALUES
     (1),
     (2),
     (3),
     (4),
     (5),
     (6),
     (7),
     (8),
     (9);

INSERT INTO location (description, src, location_name) VALUES
('The Eiffel Tower is an iconic symbol of Paris, offering stunning city views from its observation decks.', 'https://images.unsplash.com/photo-1431274172761-fca41d930114', 'Paris, France'),
('Historic Colosseum where gladiators once battled, Rome''s most famous landmark.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', 'Rome, Italy'),
('Picturesque canals and bridges make Venice one of the most romantic cities in the world.', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0', 'Venice, Italy'),
('The Acropolis of Athens, a UNESCO site with ancient Greek ruins overlooking the city.', 'https://images.unsplash.com/photo-1565992441121-4367c2967103', 'Athens, Greece'),

('The Great Wall of China stretches over 13,000 miles across northern China.', 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b', 'Great Wall, China'),
('Beautiful temples and cherry blossoms make Kyoto a must-visit in spring.', 'https://images.unsplash.com/photo-1492571350019-22de08371fd3', 'Kyoto, Japan'),
('The Taj Mahal, an ivory-white marble mausoleum and one of the New7Wonders.', 'https://images.unsplash.com/photo-1564507592333-c60657eea523', 'Agra, India'),

('The Statue of Liberty has welcomed millions of immigrants to New York harbor.', 'https://images.unsplash.com/photo-1545324415-1a9b452f7a1e', 'New York, USA'),
('Grand Canyon offers breathtaking views of layered red rock formations.', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', 'Grand Canyon, USA'),
('Christ the Redeemer statue overlooks Rio de Janeiro from Corcovado mountain.', 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f', 'Rio de Janeiro, Brazil'),

('The Pyramids of Giza, the last remaining wonder of the ancient world.', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368', 'Cairo, Egypt'),
('Table Mountain provides spectacular views over Cape Town and the Atlantic.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 'Cape Town, South Africa'),

('The Sydney Opera House is a masterpiece of modern architecture.', 'https://images.unsplash.com/photo-1523428096881-5bd79d043006', 'Sydney, Australia'),
('Milford Sound features stunning fjords with waterfalls in New Zealand.', 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74', 'Milford Sound, NZ');

INSERT INTO POI (POI_name, POI_description, src, location_id, points) VALUES
('Eiffel Tower', 'Iconic iron tower offering panoramic city views from its observation decks.', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', 1, 50),
('Louvre Museum', 'World''s largest art museum housing the Mona Lisa and thousands of other works.', 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', 1, 40),
('Notre-Dame Cathedral', 'Medieval Catholic cathedral known for its French Gothic architecture.', 'https://images.unsplash.com/photo-1431274172761-fca41d930114', 1, 30),

('Colosseum', 'Ancient amphitheater that hosted gladiator contests and public spectacles.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', 2, 50),
('Trevi Fountain', 'Baroque fountain where visitors throw coins to ensure their return to Rome.', 'https://images.unsplash.com/photo-1551632811-561732d1e306', 2, 35),
('Pantheon', 'Remarkably preserved ancient Roman temple with a massive dome.', 'https://images.unsplash.com/photo-1531572753322-ad063cecc140', 2, 30),

('St. Mark''s Basilica', 'Byzantine-style cathedral with golden mosaics and lavish interiors.', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0', 3, 45),
('Rialto Bridge', 'Stone arch bridge crossing the Grand Canal, lined with shops.', 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9', 3, 30),
('Doge''s Palace', 'Gothic-style palace that was the residence of the Doge of Venice.', 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3', 3, 35),

('Acropolis', 'Ancient citadel containing the remains of several historic buildings.', 'https://images.unsplash.com/photo-1565992441121-4367c2967103', 4, 50),
('Parthenon', 'Dedicated to the goddess Athena, the most famous building of Ancient Greece.', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d', 4, 45),
('Temple of Olympian Zeus', 'Colossal ruined temple that was once the largest in Greece.', 'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d', 4, 30),

('Badaling Section', 'Most visited and best-preserved section of the Great Wall.', 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b', 5, 60),
('Mutianyu Section', 'Less crowded section with beautiful scenery and cable car access.', 'https://images.unsplash.com/photo-1528123778682-0a95f6f0d472', 5, 50),
('Jinshanling Section', 'Popular for hiking with both restored and wild wall portions.', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d', 5, 45),

('Fushimi Inari Shrine', 'Famous for its thousands of vermilion torii gates.', 'https://images.unsplash.com/photo-1492571350019-22de08371fd3', 6, 55),
('Kinkaku-ji', 'Zen Buddhist temple covered in gold leaf, reflecting beautifully on its pond.', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989', 6, 45),
('Arashiyama Bamboo Grove', 'Tall bamboo stalks create a mesmerizing natural tunnel.', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989', 6, 40),

('Taj Mahal', 'Iconic white marble mausoleum built by Shah Jahan for his wife.', 'https://images.unsplash.com/photo-1564507592333-c60657eea523', 7, 60),
('Agra Fort', '16th-century Mughal fortress made of red sandstone.', 'https://images.unsplash.com/photo-1585506942812-e72b29cef752', 7, 40),
('Mehtab Bagh', 'Moonlight Garden offering perfect sunset views of the Taj Mahal.', 'https://images.unsplash.com/photo-1585506942812-e72b29cef752', 7, 35),

('Statue of Liberty', 'Symbol of freedom gifted by France, standing on Liberty Island.', 'https://images.unsplash.com/photo-1545324415-1a9b452f7a1e', 8, 55),
('Central Park', 'Massive urban park with walking trails, lakes, and the famous Bow Bridge.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', 8, 45),
('Empire State Building', 'Iconic Art Deco skyscraper with observation decks on 86th and 102nd floors.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', 8, 50),

('Grand Canyon Village', 'Main hub with historic buildings and canyon viewpoints.', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', 9, 50),
('Bright Angel Trail', 'Popular hiking trail descending into the canyon with stunning views.', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', 9, 60),
('Skywalk', 'Glass bridge extending over the canyon rim with dramatic views.', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', 9, 55),

('Christ the Redeemer', 'Massive Art Deco statue of Jesus Christ atop Corcovado mountain.', 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f', 10, 60),
('Sugarloaf Mountain', 'Peak with cable cars offering panoramic views of Rio.', 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f', 10, 50),
('Copacabana Beach', 'Famous 4km stretch of beach with vibrant atmosphere.', 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f', 10, 45),

('Great Pyramid of Giza', 'Oldest and largest of the three pyramids in the Giza complex.', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368', 11, 60),
('Sphinx', 'Limestone statue with a lion''s body and a human head.', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368', 11, 55),
('Egyptian Museum', 'Home to an extensive collection of ancient Egyptian antiquities.', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368', 11, 45),

('Table Mountain', 'Flat-topped mountain with cable car access and hiking trails.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 12, 55),
('Robben Island', 'Former prison where Nelson Mandela was held, now a museum.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 12, 45),
('Cape of Good Hope', 'Dramatic rocky headland at Africa''s southwestern tip.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 12, 50),

('Sydney Opera House', 'Iconic performing arts center with distinctive sail-like design.', 'https://images.unsplash.com/photo-1523428096881-5bd79d043006', 13, 60),
('Sydney Harbour Bridge', 'Steel arch bridge nicknamed "The Coathanger".', 'https://images.unsplash.com/photo-1523428096881-5bd79d043006', 13, 45),
('Bondi Beach', 'Famous surf beach with golden sands and ocean pools.', 'https://images.unsplash.com/photo-1523428096881-5bd79d043006', 13, 40),

('Mitre Peak', 'Iconic mountain rising sharply from the fjord''s waters.', 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74', 14, 55),
('Stirling Falls', 'Dramatic 155-meter waterfall that cascades into the sound.', 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74', 14, 45),
('Underwater Observatory', 'Unique facility showcasing the sound''s marine life.', 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74', 14, 40);


INSERT INTO Post (uploaded_by, caption, src, PoiID, status, status_by_user) VALUES
(1, 'Beautiful view from the top!', 'https://example.com/posts/eiffel1.jpg', 1, 'Approved', 'Active'),
(3, 'Sunset at the Colosseum was amazing', 'https://example.com/posts/colosseum1.jpg', 2, 'Approved', 'Active'),
(5, 'The Louvre never disappoints', 'https://example.com/posts/louvre1.jpg', 1, 'Approved', 'Active'),
(2, 'Venetian canals are magical', 'https://example.com/posts/venice1.jpg', 3, 'Approved', 'Active'),
(4, 'Acropolis at golden hour', 'https://example.com/posts/acropolis1.jpg', 4, 'Approved', 'Active');

INSERT INTO Post (uploaded_by, caption, src, PoiID, status, status_by_user) VALUES
(6, 'Just arrived at the Great Wall!', 'https://example.com/posts/greatwall1.jpg', 5, 'Pending', 'Active'),
(7, 'Kyoto temples are breathtaking', 'https://example.com/posts/kyoto1.jpg', 6, 'Pending', 'Active'),
(8, 'Taj Mahal at sunrise', 'https://example.com/posts/tajmahal1.jpg', 7, 'Pending', 'Active');

INSERT INTO Post (uploaded_by, caption, src, PoiID, status, status_by_user, DeletedBy) VALUES
(2, 'Not my best photo', 'https://example.com/posts/ny1.jpg', 8, 'Rejected', 'Active', 1),
(5, 'Oops wrong location', 'https://example.com/posts/random1.jpg', 9, 'Rejected', 'Active', 2);

INSERT INTO Post (uploaded_by, caption, src, PoiID, status, status_by_user) VALUES
(3, 'Deleted this by mistake', 'https://example.com/posts/venice2.jpg', 3, 'Approved', 'DeletedByUser'),
(1, 'Changed my mind about this one', 'https://example.com/posts/louvre2.jpg', 1, 'Approved', 'DeletedByUser');

INSERT INTO Post (uploaded_by, caption, src, PoiID, status, status_by_user) VALUES
(4, 'Updated with better description', 'https://example.com/posts/acropolis2.jpg', 4, 'Approved', 'Edited'),
(7, 'Fixed the caption', 'https://example.com/posts/kyoto2.jpg', 6, 'Pending', 'Edited');

INSERT INTO Review (uploaded_by, Rating, Text, PoiID, DeletedBy, status_by_user, status) VALUES
 (1, 5, 'Amazing view from the Eiffel Tower! Totally worth it.', 1, NULL, 'Active', 'Approved'),
 (2, 4, 'Colosseum was very impressive but crowded.', 4, NULL, 'Active', 'Approved'),
 (3, 3, 'Louvre had some interesting exhibits but a bit overwhelming.', 2, NULL, 'Edited', 'Approved'),
 (4, 2, 'Acropolis was nice, but the weather was too hot.', 10, NULL, 'Active', 'Pending'),
 (5, 5, 'Great Wall of China is breathtaking and well preserved.', 5, NULL, 'Active', 'Approved'),
 (6, 1, 'Kyoto temples were under renovation, disappointing visit.', 6, 1, 'DeletedByUser', 'Rejected'),
 (7, 4, 'Taj Mahal is stunning during sunrise.', 7, NULL, 'Active', 'Approved'),
 (8, 3, 'Statue of Liberty was smaller than expected.', 8, NULL, 'Edited', 'Pending'),
 (9, 5, 'Sydney Opera House architecture is just iconic!', 13, 2, 'DeletedByUser', 'Rejected');




INSERT INTO location (description, src, location_name) VALUES
('Athens, the capital of Greece, is known for ancient monuments like the Acropolis and the Parthenon.', 'https://hhotels.gr/wp-content/uploads/2024/04/shutterstock_2392162239.jpg', 'Athens'),
('Thessaloniki, a vibrant port city, is famous for its festivals, Byzantine walls, and the White Tower.', 'https://centralmacedoniablob.blob.core.windows.net/portal-content/Istoriko_kentro_thessalonikis_3.jpg', 'Thessaloniki'),
('Santorini, a stunning island in the Aegean Sea, is known for its white houses and sunsets.', 'https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/hebnsqjvxshq5t1krsku', 'Santorini'),
('Mykonos, a cosmopolitan island, is famous for its beaches and nightlife.', 'https://lp-cms-production.imgix.net/2025-03/Shutterstock1916571950.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop', 'Mykonos'),
('Delphi, an archaeological site that hosted the famous Oracle of Apollo.', 'https://www.freetour.com/images/tours/24861/full-day-tour-to-delphiarachova-and-distomo-01.jpg', 'Delphi');

-- Greek POIs with corrected location_id references (1 to 5)
INSERT INTO POI (POI_name, POI_description, src, location_id, points) VALUES
('Acropolis', 'Iconic archaeological site featuring the Parthenon and other ancient buildings.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Classic_view_of_Acropolis.jpg/960px-Classic_view_of_Acropolis.jpg', 1, 50),
('Parthenon', 'Ancient temple dedicated to Athena with imposing classical architecture.', 'https://upload.wikimedia.org/wikipedia/commons/d/da/The_Parthenon_in_Athens.jpg', 1, 45),
('Acropolis Museum', 'Modern museum housing archaeological finds from the Acropolis.', 'https://www.visitgreece.gr/files/merakos_02_acropolismuseum_1310x769.jpg', 1, 40),

('White Tower', 'Symbol of Thessaloniki offering panoramic views and a historical exhibition.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zD-gTP3aZ3DWCKbG_ze2Ch74EdMmRTrWkA&s', 2, 50),
('Arch of Galerius', 'Roman monument from the era of Emperor Galerius.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5YJJozlK9-Ws4XG14f1R1UTydxBPF1MNQQ&s', 2, 35),
('Rotunda', 'Circular building with a history as a temple, mausoleum, and church.', 'https://www.thessalonikiguide.gr/wp-content/uploads/2016/05/rotonta-thessaloniki-2.jpg', 2, 30),

('Oia', 'Picturesque village with breathtaking sunsets.', 'https://www.santoriniholidaycars.com/wp-content/uploads/2012/01/oia-village.jpg', 3, 50),
('Caldera', 'Stunning volcanic crater surrounded by cliffs.', 'https://exploringgreece.tv/wp-content/uploads/2017/06/%CE%A3%CE%B1%CE%BD%CF%84%CE%BF%CF%81%CE%AF%CE%BD%CE%B7.jpg', 3, 45),
('Red Beach', 'Unique beach with red cliffs and turquoise waters.', 'https://ferryfast.gr/wp-content/uploads/2024/06/Kokkini-paralia-santorini-1024x682.jpg', 3, 35),

('Little Venice', 'Seaside neighborhood with houses built right above the sea.', 'https://fastferries.com.gr/wp-content/uploads/2020/02/mikri-venetia-mykonou-1.jpg', 4, 45),
('Mykonos Windmills', 'Iconic 16th-century windmills with panoramic views.', 'https://www.mykonostour.gr/image.php?src=pictures/photo/31.jpg&width=640', 4, 40),
('Paradise Beach', 'Famous beach known for parties and loud music.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8a/ae/46/aerial-view-of-paradise.jpg?w=1200&h=-1&s=1', 4, 50),

('Delphi Archaeological Site', 'Important ancient site with the Temple of Apollo and a stadium.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XghGSdaUz5_Ub9QkdObihwSlnZKRsqpdwA&s', 5, 55),
('Delphi Museum', 'Rich collection of antiquities from the sacred area of Delphi.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/b9/33/47/20200808-150252-largejpg.jpg?w=800&h=500&s=1', 5, 40),
('Delphi Theater', 'Ancient theater with fantastic acoustics and a view of the valley.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQa-ViIcfBvxuMqDltXdjEmdhyUaogtLJvjA&s', 5, 35);