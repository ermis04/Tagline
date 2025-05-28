DROP DATABASE IF EXISTS tagline;
CREATE DATABASE tagline;
USE tagline;

CREATE TABLE Person (
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
);

CREATE TABLE Moderator (
    ModID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    PRIMARY KEY (ModID),
    CONSTRAINT personid FOREIGN KEY (PersonID) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (PersonID)
);

CREATE TABLE User (
    UserID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    points_collected INT NOT NULL DEFAULT 0,
    PRIMARY KEY (UserID),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (PersonID)
);

CREATE TABLE Partner (
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
);

CREATE TABLE Location (
    location_id INT NOT NULL AUTO_INCREMENT,
    description TEXT,
    src VARCHAR(255) NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (location_id),
    INDEX (location_name)
);

CREATE TABLE Poi (
    POIID INT NOT NULL AUTO_INCREMENT,
    POI_name VARCHAR(100) NOT NULL,
    POI_description TEXT,
    src VARCHAR(255) NOT NULL,
    location_id INT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    PRIMARY KEY (POIID),
    CONSTRAINT location FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (location_id)
);

CREATE TABLE Review (
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
);

CREATE TABLE Post (
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
);

CREATE TABLE Comment (
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
);

CREATE TABLE Ad (
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
);

CREATE TABLE Visit (
    visitor INT NOT NULL,
    PlaceToVisit INT NOT NULL,
    VisitDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (visitor, PlaceToVisit),
    FOREIGN KEY (visitor) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PlaceToVisit) REFERENCES Poi(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (PlaceToVisit),
    INDEX (visitor)
);

CREATE TABLE Friends (
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
);