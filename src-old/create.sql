-- Drop existing tables if they exist (in dependency order)
DROP TABLE IF EXISTS Sponsorship;
DROP TABLE IF EXISTS Ad;
DROP TABLE IF EXISTS Visit;
DROP TABLE IF EXISTS Friends;
DROP TABLE IF EXISTS Participate;
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS suggestedPOI;
DROP TABLE IF EXISTS POI;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Partner;
DROP TABLE IF EXISTS Moderator;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Person;

-- Base entity: Person
CREATE TABLE Person (
    PersonID INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    DateCreated DATE,
    Role ENUM('User', 'Moderator', 'Partner')
);

-- Inheriting roles from Person
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    points_collected INT,
    FOREIGN KEY (UserID) REFERENCES Person(PersonID)
);

CREATE TABLE Moderator (
    ModID INT PRIMARY KEY,
    FOREIGN KEY (ModID) REFERENCES Person(PersonID)
);

CREATE TABLE Partner (
    PartnerID INT PRIMARY KEY,
    BusinessName VARCHAR(100),
    Balance DECIMAL(10,2) DEFAULT 0,
    phone VARCHAR(20),
    email VARCHAR(100),
    password VARCHAR(100)
);

-- Location and POI
CREATE TABLE Location (
    location_id INT PRIMARY KEY,
    description TEXT,
    location_name VARCHAR(100)
);

CREATE TABLE POI (
    PoiID INT PRIMARY KEY,
    POI_name VARCHAR(100),
    locationID INT,
    points INT,
    FOREIGN KEY (locationID) REFERENCES Location(location_id)
);

-- Suggested POIs
CREATE TABLE suggestedPOI (
    suggestionID INT PRIMARY KEY,
    Name VARCHAR(100),
    LocationID INT,
    suggestion_summary VARCHAR(400),
    Suggested_by INT,
    ApprovedBy INT,
    CheckDate DATE,
    RejectionReason VARCHAR(400),
    FOREIGN KEY (LocationID) REFERENCES Location(location_id),
    FOREIGN KEY (Suggested_by) REFERENCES User(UserID),
    FOREIGN KEY (ApprovedBy) REFERENCES Moderator(ModID)
);

-- Posts and Reviews
CREATE TABLE Post (
    PostID INT PRIMARY KEY,
    uploaded_by INT,
    caption VARCHAR(400),
    src VARCHAR(255),
    uploadDate DATE,
    DeletedBy INT,
    PoiID INT,
    FOREIGN KEY (uploaded_by) REFERENCES User(UserID),
    FOREIGN KEY (DeletedBy) REFERENCES Moderator(ModID),
    FOREIGN KEY (PoiID) REFERENCES POI(PoiID)
);

CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,
    uploaded_by INT,
    Rating INT,
    Text VARCHAR(200),
    PoiID INT,
    uploadDate DATE,
    DeletedBy INT,
    FOREIGN KEY (uploaded_by) REFERENCES User(UserID),
    FOREIGN KEY (DeletedBy) REFERENCES Moderator(ModID),
    FOREIGN KEY (PoiID) REFERENCES POI(PoiID)
);

CREATE TABLE Comment (
    commenter INT,
    post_commented INT,
    text VARCHAR(400),
    CommentDate DATE,
    FOREIGN KEY (commenter) REFERENCES User(UserID),
    FOREIGN KEY (post_commented) REFERENCES Post(PostID)
);

-- Events and participation
CREATE TABLE Event (
    EventID INT PRIMARY KEY,
    PoiID INT,
    start_date DATE,
    end_date DATE,
    text VARCHAR(400),
    src VARCHAR(255),
    created_by INT,
    sponsored_by INT,
    FOREIGN KEY (PoiID) REFERENCES POI(PoiID),
    FOREIGN KEY (created_by) REFERENCES Moderator(ModID),
    FOREIGN KEY (sponsored_by) REFERENCES Partner(PartnerID)
);

CREATE TABLE Participate (
    UserID INT,
    EventID INT,
    AtDate DATE, -- When user joined the event
    PRIMARY KEY (UserID, EventID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);

-- User relationships
CREATE TABLE Friends (
    FriendshipID INT PRIMARY KEY,
    User1ID INT,
    User2ID INT,
    Status ENUM('Pending', 'Accepted'),
    FOREIGN KEY (User1ID) REFERENCES User(UserID),
    FOREIGN KEY (User2ID) REFERENCES User(UserID)
);

-- Visits
CREATE TABLE Visit (
    Visitor INT,
    PlaceToVisit INT,
    VisitDate DATE,
    FOREIGN KEY (Visitor) REFERENCES User(UserID),
    FOREIGN KEY (PlaceToVisit) REFERENCES POI(PoiID)
);

-- Ads and Sponsorships
CREATE TABLE Ad (
    AdID INT PRIMARY KEY,
    uploaded_by INT,
    Description VARCHAR(200),
    start_date DATE,
    end_date DATE,
    status ENUM('Approved', 'Rejected'),
    cost DECIMAL(10,2),
    PoiID INT,
    FOREIGN KEY (uploaded_by) REFERENCES Partner(PartnerID),
    FOREIGN KEY (PoiID) REFERENCES POI(PoiID)
);

CREATE TABLE Sponsorship (
    SponsorshipID INT PRIMARY KEY,
    PartnerID INT,
    EventID INT,
    FOREIGN KEY (PartnerID) REFERENCES Partner(PartnerID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);
