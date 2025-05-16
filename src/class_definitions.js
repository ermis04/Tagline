// Entities

class Person {
    constructor(firstName, lastName, username, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class User extends Person {
    constructor(firstName, lastName, email, password, username, points = 0) {
        super(firstName, lastName, username, email, password);
        this.points = points;
        this.visitedPois = [];
        this.pendingFriends = [];
        this.activeFriends = [];
        this.events = [];
    }

    addPoints(points) {
        this.points += points;
    }

    addFriend(friend) {
        if (friend instanceof User) {
            this.pendingFriends.push(friend);
        } else {
            throw new Error('Friend must be a User instance');
        }
    }

    acceptFriend(friend) {
        const idx = this.pendingFriends.indexOf(friend);
        if (idx !== -1) {
            this.pendingFriends.splice(idx, 1);
            this.activeFriends.push(friend);
        } else {
            throw new Error('Friend request not found');
        }
    }
}

class Moderator extends Person {
    constructor(firstName, lastName, username, email, password) {
        super(firstName, lastName, username, email, password);
        this.locationsManaged = [];
        this.approvedAds = [];
        this.rejectedAds = [];
        this.approvedPosts = [];
        this.rejectedPosts = [];
        this.approvedReviews = [];
        this.rejectedReviews = [];
    }

    manageNewLocation(location) {
        this.locationsManaged.push(location);
    }

    removeManagedLocation(location) {
        const idx = this.locationsManaged.indexOf(location);
        if (idx !== -1) {
            this.locationsManaged.splice(idx, 1);
        } else {
            throw new Error('Location not managed by this moderator');
        }
    }

    approveAd(ad) {
        this.approvedAds.push(ad);
        ad.approved = true;
    }

    rejectAd(ad) {
        this.rejectedAds.push(ad);
        ad.approved = false;
    }

    approvePost(post) {
        this.approvedPosts.push(post);
        post.approved = true;
    }

    rejectPost(post) {
        this.rejectedPosts.push(post);
        post.approved = false;
    }

    approveReview(review) {
        this.approvedReviews.push(review);
        review.approved = true;
    }

    rejectReview(review) {
        this.rejectedReviews.push(review);
        review.approved = false;
    }
}

class Partner extends Person {
    constructor(firstName, lastName, username, email, password, businessName, phone, balance = 0) {
        super(firstName, lastName, username, email, password);
        this.ads = [];
        this.eventsSponsoring = [];
        this.businessName = businessName;
        this.balance = balance;
        this.phone = phone;
    }

    createAd(ad) {
        this.ads.push(ad);
    }
}

// Places

class Location {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.pois = [];
    }

    addPoi(poi) {
        this.pois.push(poi);
    }
}

class POI {
    constructor(name, description, points) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.reviews = [];
        this.ads = [];
        this.posts = [];
        this.events = [];
    }

    getPoints() {
        return this.points;
    }

    addReview(review) {
        this.reviews.push(review);
    }

    addAd(ad) {
        this.ads.push(ad);
    }

    addPost(post) {
        this.posts.push(post);
    }

    addEvent(event) {
        this.events.push(event);
    }
}

// User Content

class Content {
    constructor(uploadedBy, deletedBy = null) {
        this.uploadedBy = uploadedBy;
        this.deletedBy = deletedBy;
    }
}

class Review extends Content {
    constructor(uploadedBy, rating, text, deletedBy = null) {
        super(uploadedBy, deletedBy);
        this.value = rating;
        this.content = text;
    }

    setValue(value) {
        if (value >= 1 && value <= 5) {
            this.value = value;
        } else {
            throw new Error('Value must be between 1 and 5');
        }
    }
}

class Post extends Content {
    constructor(uploadedBy, src, caption, deletedBy = null) {
        super(uploadedBy, deletedBy);
        this.src = src;
        this.caption = caption;
        this.likes = [];
        this.comments = [];
    }
}

class Comment extends Content {
    constructor(uploadedBy, text, deletedBy = null) {
        super(uploadedBy, deletedBy);
        this.text = text;
    }
}

// Partner Content

class Extras {
    constructor(title, description, startDate, endDate) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

class Ad extends Extras {
    constructor(title, description, startDate, endDate, cost, status) {
        super(title, description, startDate, endDate);
        this.status = status; // should be 'approved', 'rejected', or 'deleted'
        this.cost = cost;
    }
}

class Event extends Extras {
    constructor(title, description, startDate, endDate, txt, src) {
        super(title, description, startDate, endDate);
        this.txt = txt;
        this.src = src;
        this.sponsors = [];
    }

    addSponsor(partner) {
        this.sponsors.push(partner);
    }
}