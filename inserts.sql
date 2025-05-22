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