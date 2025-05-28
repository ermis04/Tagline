const db = require("./db"); // adjust path if needed

async function createTables() {
  const insertStatements = [
    `INSERT INTO Location (description, src, location_name) VALUES
('Athens, the capital of Greece, is known for ancient monuments like the Acropolis and the Parthenon.', 'https://hhotels.gr/wp-content/uploads/2024/04/shutterstock_2392162239.jpg', 'Athens'),
('Thessaloniki, a vibrant port city, is famous for its festivals, Byzantine walls, and the White Tower.', 'https://centralmacedoniablob.blob.core.windows.net/portal-content/Istoriko_kentro_thessalonikis_3.jpg', 'Thessaloniki'),
('Santorini, a stunning island in the Aegean Sea, is known for its white houses and sunsets.', 'https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/hebnsqjvxshq5t1krsku', 'Santorini'),
('Mykonos, a cosmopolitan island, is famous for its beaches and nightlife.', 'https://lp-cms-production.imgix.net/2025-03/Shutterstock1916571950.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop', 'Mykonos'),
('Delphi, an archaeological site that hosted the famous Oracle of Apollo.', 'https://www.freetour.com/images/tours/24861/full-day-tour-to-delphiarachova-and-distomo-01.jpg', 'Delphi')
`,
    `
INSERT INTO Poi (POI_name, POI_description, src, location_id, points) VALUES
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
('Delphi Theater', 'Ancient theater with fantastic acoustics and a view of the valley.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQa-ViIcfBvxuMqDltXdjEmdhyUaogtLJvjA&s', 5, 35)
`,
  ];
  const tableStatements = [
    `DROP TABLE IF EXISTS Friends;`,
    `DROP TABLE IF EXISTS Visit;`,
    `DROP TABLE IF EXISTS Ad;`,
    `DROP TABLE IF EXISTS Comment;`,
    `DROP TABLE IF EXISTS Post;`,
    `DROP TABLE IF EXISTS Review;`,
    `DROP TABLE IF EXISTS Poi;`,
    `DROP TABLE IF EXISTS Location;`,
    `DROP TABLE IF EXISTS Partner;`,
    `DROP TABLE IF EXISTS User;`,
    `DROP TABLE IF EXISTS Moderator;`,
    `DROP TABLE IF EXISTS Person;`,

    `CREATE TABLE IF NOT EXISTS Person (
    PersonID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    src VARCHAR(255),
    Role ENUM('USER', 'MODERATOR', 'PARTNER') NOT NULL,
    PRIMARY KEY (PersonID),
    UNIQUE (username),
    UNIQUE (email)
  );`,

    `CREATE TABLE IF NOT EXISTS Moderator (
    ModID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    PRIMARY KEY (ModID),
    CONSTRAINT personid FOREIGN KEY (PersonID) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (PersonID)
  );`,

    `CREATE TABLE IF NOT EXISTS User (
    UserID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    points_collected INT NOT NULL DEFAULT 0,
    PRIMARY KEY (UserID),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (PersonID)
  );`,

    `CREATE TABLE IF NOT EXISTS Partner (
    PartnerID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    BusinessName VARCHAR(100) NOT NULL,
    Balance FLOAT NOT NULL DEFAULT 0,
    phone VARCHAR(20) NOT NULL,
    BusinessDescription TEXT,
    status ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (PartnerID),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (PersonID)
  );`,

    `CREATE TABLE IF NOT EXISTS Location (
    location_id INT NOT NULL AUTO_INCREMENT,
    description TEXT,
    src VARCHAR(255) NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (location_id),
    INDEX (location_name) 
  );`,

    `CREATE TABLE IF NOT EXISTS Poi (
    POIID INT NOT NULL AUTO_INCREMENT,
    POI_name VARCHAR(100) NOT NULL,
    POI_description TEXT,
    src VARCHAR(255) NOT NULL,
    location_id INT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    PRIMARY KEY (POIID),
    CONSTRAINT location FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (location_id)
  );`,

    `CREATE TABLE IF NOT EXISTS Review (
    ReviewID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Text TEXT,
    PoiID INT NOT NULL,
    uploadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DeletedBy INT NULL,
    src VARCHAR(255),
    status_by_user ENUM('DeletedByUser', 'Active', 'Edited') NOT NULL DEFAULT 'Active',
    status ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (ReviewID),
    CONSTRAINT uploader FOREIGN KEY (uploaded_by) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT loaction FOREIGN KEY (PoiID) REFERENCES Poi(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT checkedfrom FOREIGN KEY (DeletedBy) REFERENCES Moderator(ModID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (uploaded_by),
    INDEX (PoiID),
    INDEX (DeletedBy)
  );`,

    `CREATE TABLE IF NOT EXISTS Post (
    PostID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    caption TEXT,
    src VARCHAR(255) ,
    uploadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DeletedBy INT NULL,
    PoiID INT NOT NULL,
    like_count INT NOT NULL DEFAULT 0,
    status ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    status_by_user ENUM('DeletedByUser', 'Active', 'Edited') NOT NULL DEFAULT 'Active',
    PRIMARY KEY (PostID),
    CONSTRAINT postedfrom FOREIGN KEY (uploaded_by) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT checked FOREIGN KEY (DeletedBy) REFERENCES Moderator(ModID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT place FOREIGN KEY (PoiID) REFERENCES Poi(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (uploaded_by),
    INDEX (DeletedBy),
    INDEX (PoiID)
  );`,

    `CREATE TABLE IF NOT EXISTS Comment (
    CommentID INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    post_commented INT NOT NULL,
    text TEXT NOT NULL,
    CommentDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (CommentID),
    CONSTRAINT commenter FOREIGN KEY (commenter) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT post_commented FOREIGN KEY (post_commented) REFERENCES Post(PostID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (commenter),
    INDEX (post_commented)
  );`,

    `CREATE TABLE IF NOT EXISTS Ad (
    AdID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    Description TEXT,
    start_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    end_date DATE NOT NULL,
    views INT NOT NULL DEFAULT 0,
    clicks INT NOT NULL DEFAULT 0,
    status ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    cost INT NOT NULL,
    PoiID INT NOT NULL,
    PRIMARY KEY (AdID),
    FOREIGN KEY (uploaded_by) REFERENCES Partner(PartnerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PoiID) REFERENCES Poi(POIID) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX (uploaded_by),
    INDEX (PoiID),
    INDEX (status),
    CONSTRAINT valid_dates CHECK (end_date >= start_date),
    CONSTRAINT positive_cost CHECK (cost >= 0)
  );`,

    `CREATE TABLE IF NOT EXISTS Visit (
    visitor INT NOT NULL,
    PlaceToVisit INT NOT NULL,
    VisitDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (visitor, PlaceToVisit),
    FOREIGN KEY (visitor) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PlaceToVisit) REFERENCES Poi(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (PlaceToVisit),
    INDEX (visitor)
  );`,

    `CREATE TABLE IF NOT EXISTS Friends (
    FriendshipID INT NOT NULL AUTO_INCREMENT,
    User1ID INT NOT NULL,
    User2ID INT NOT NULL,
    Status ENUM('Pending', 'Accepted', 'Rejected', 'Blocked') NOT NULL DEFAULT 'Accepted',
    PRIMARY KEY (FriendshipID),
    FOREIGN KEY (User1ID) REFERENCES User(UserID),
    FOREIGN KEY (User2ID) REFERENCES User(UserID),
    UNIQUE KEY unique_friend_pair (User1ID, User2ID),
    INDEX (Status),
    CONSTRAINT valid_friendship CHECK (User1ID < User2ID)
  );`,
  ];

  try {
    // for (const statement of tableStatements) {
    //   await db.query(statement);
    // }

    // console.log("✅ Tables created or already exist.");

    for (const statement of insertStatements) {
      await db.query(statement);
    }

    console.log("✅ Inserted successfully");
  } catch (err) {
    console.error("❌ Error initializing tables:", err.message);
  }
}

createTables();
