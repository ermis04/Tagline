
CREATE TABLE Person (
    PersonID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Role ENUM('User', 'Moderator', 'Partner') NOT NULL,
    PRIMARY KEY (PersonID),
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE Moderator (
    ModID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    PRIMARY KEY (ModID),
    CONSTRAINT personid FOREIGN KEY (PersonID) REFERENCES Person(PersonID) on delete cascade on update cascade,
    UNIQUE (PersonID)
);


CREATE TABLE User (
    UserID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    points_collected INT NOT NULL DEFAULT 0,
    PRIMARY KEY (UserID),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID) on delete cascade on update cascade,
    UNIQUE (PersonID)
);

CREATE TABLE Partner (
    PartnerID INT NOT NULL AUTO_INCREMENT,
    PersonID INT NOT NULL,
    BusinessName VARCHAR(100) NOT NULL,
    Balance FLOAT NOT NULL DEFAULT 0,
    phone VARCHAR(20) NOT NULL,
    PRIMARY KEY (PartnerID),
    FOREIGN KEY (PersonID) REFERENCES Person(PersonID) on delete cascade on update cascade,
    UNIQUE (PersonID),
    UNIQUE (phone)  
);

CREATE TABLE location (
    location_id INT NOT NULL AUTO_INCREMENT,
    description TEXT,
    location_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (location_id),
    INDEX (location_name)  -- For better search performance
);

CREATE TABLE POI (
    POIID INT NOT NULL AUTO_INCREMENT,
    POI_name VARCHAR(100) NOT NULL,
    location_id INT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    PRIMARY KEY (POIID),
    CONSTRAINT location FOREIGN KEY (location_id) REFERENCES Location(location_id) on delete cascade on update cascade,
    INDEX (location_id)  -- For better join performance
);

CREATE TABLE Review (
    ReviewID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Text TEXT,
    PoiID INT NOT NULL,
    uploadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DeletedBy INT NULL,
    PRIMARY KEY (ReviewID),
    CONSTRAINT uploader FOREIGN KEY (uploaded_by) REFERENCES User(UserID) on delete cascade on update cascade,
    CONSTRAINT loaction FOREIGN KEY (PoiID) REFERENCES POI(PoiID) on delete cascade on update cascade,
    CONSTRAINT checkedfrom FOREIGN KEY (DseletedBy) REFERENCES Moderator(ModID) on delete cascade on update cascade,
    INDEX (uploaded_by),
    INDEX (PoiID),
    INDEX (DeletedBy)
);

CREATE TABLE Post (
    PostID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    caption TEXT,
    src VARCHAR(255) NOT NULL, -- Stores image path/URL
    uploadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DeletedBy INT NULL,
    PoiID INT NOT NULL,
    PRIMARY KEY (PostID),
    CONSTRAINT postedfrom FOREIGN KEY (uploaded_by) REFERENCES User(UserID) on delete cascade on update cascade,
    CONSTRAINT checked FOREIGN KEY (DeletedBy) REFERENCES Moderator(ModID) on delete cascade on update cascade,
    CONSTRAINT place FOREIGN KEY (PoiID) REFERENCES POI(POIID) on delete cascade on update cascade,
    INDEX (uploaded_by),
    INDEX (DeletedBy),
    INDEX (PoiID)
);

CREATE TABLE Comment (
    commenter INT NOT NULL,
    post_commented INT NOT NULL,
    text TEXT NOT NULL,
    CommentDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (commenter, post_commented),  -- Composite primary key
    CONSTRAINT commenter FOREIGN KEY (commenter) REFERENCES User(UserID) on delete cascade on update cascade,
    CONSTRAINT post_commented FOREIGN KEY (post_commented) REFERENCES Post(PostID) on delete cascade on update cascade,
    INDEX (commenter),
    INDEX (post_commented)
);

CREATE TABLE Suggestion (
    suggestionID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    PoiLocation INT NOT NULL,
    Suggested_By INT NOT NULL,
    SuggestDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ApprovedBy INT NULL,
    CheckDate DATETIME NULL,
    RejectionReason TEXT NULL,
    PRIMARY KEY (suggestionID),
    FOREIGN KEY (PoiLocation) REFERENCES POI(POIID) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT suggester FOREIGN KEY (Suggested_By) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT checkedfrommod FOREIGN KEY (ApprovedBy) REFERENCES Moderator(ModID) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX (PoiLocation),
    INDEX (Suggested_By),
    INDEX (ApprovedBy)
);

-- Create trigger to automatically set CheckDate on approval/rejection
DELIMITER //
CREATE TRIGGER set_checkdate
BEFORE UPDATE ON Suggestion
FOR EACH ROW
BEGIN
    IF (NEW.ApprovedBy IS NOT NULL OR NEW.RejectionReason IS NOT NULL) AND OLD.CheckDate IS NULL THEN
        SET NEW.CheckDate = CURRENT_TIMESTAMP;
    END IF;
END//
DELIMITER ;

CREATE TABLE AD (
    AdID INT NOT NULL AUTO_INCREMENT,
    uploaded_by INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    Description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    cost INT NOT NULL,
    PoiID INT NOT NULL,
    PRIMARY KEY (AdID),
    FOREIGN KEY (uploaded_by) REFERENCES Partner(PartnerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PoiID) REFERENCES POI(POIID) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX (uploaded_by),
    INDEX (PoiID),
    INDEX (status),
    CONSTRAINT valid_dates CHECK (end_date >= start_date),
    CONSTRAINT positive_cost CHECK (cost >= 0)
);

CREATE TABLE Event (
    EventID INT NOT NULL AUTO_INCREMENT,
    PoiID INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    text TEXT,
    src VARCHAR(255),
    created_by INT NOT NULL,
    sponsored_by INT NULL,
    PRIMARY KEY (EventID),
    FOREIGN KEY (PoiID) REFERENCES POI(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Moderator(ModID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (sponsored_by) REFERENCES Partner(PartnerID) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX (PoiID),
    INDEX (created_by),
    INDEX (sponsored_by),
    CONSTRAINT valid_event_dates CHECK (end_date > start_date)
);

CREATE TABLE Sponsor (
    sponsorship INT NOT NULL,
    sponsored INT NOT NULL,
    PRIMARY KEY (sponsorship, sponsored),
    FOREIGN KEY (sponsorship) REFERENCES Partner(PartnerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (sponsored) REFERENCES Event(EventID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Participate (
    UserID INT NOT NULL,
    EventID INT NOT NULL,
    AtDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID, EventID),  -- Composite primary key
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (EventID)  -- Additional index for event lookups
);

CREATE TABLE Visit (
    visitor INT NOT NULL,
    PlaceToVisit INT NOT NULL,
    VisitDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (visitor, PlaceToVisit),  -- Composite key to allow multiple visits
    FOREIGN KEY (visitor) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PlaceToVisit) REFERENCES POI(POIID) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX (PlaceToVisit),  -- For quick lookups by POI
    INDEX (visitor)   -- For quick lookups by user
);

CREATE TABLE Friends (
    FriendshipID INT NOT NULL AUTO_INCREMENT,
    User1ID INT NOT NULL,
    User2ID INT NOT NULL,
    Status ENUM('Pending', 'Accepted', 'Rejected', 'Blocked') NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (FriendshipID),
    FOREIGN KEY (User1ID) REFERENCES User(UserID),
    FOREIGN KEY (User2ID) REFERENCES User(UserID),
    INDEX (User1ID),
    INDEX (User2ID),
    INDEX (Status),
    CONSTRAINT valid_friendship CHECK (User1ID < User2ID)  -- Prevents duplicate friendships
);