#%% Entities

class Person:
    def __init__(self, first_name, last_name, username, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.password = password

class User(Person):
    def __init__(self, first_name, last_name, email, password, username, points=0):
        super().__init__(first_name, last_name, email, password, username)
        self.points = 0
        self.visited_pois = []
        self.pending_friends = []
        self.active_friends = []
        self.events = []

    def add_points(self, points): #after visiting POI you get points
        self.points += points

    def add_friend(self, friend):
        if isinstance(friend, User):
            self.pending_friends.append(friend)
        else:
            raise ValueError("Friend must be a User instance")

    def accept_friend(self, friend):
        if friend in self.pending_friends:
            self.pending_friends.remove(friend)
            self.active_friends.append(friend)
        else:
            raise ValueError("Friend request not found")

class Moderator(Person):
    def __init__(self, first_name, last_name, username, email, password):
        super().__init__(first_name, last_name, username, email, password)
        self.locations_managed = []
        self.approved_ads = []
        self.rejected_ads = []
        self.approved_posts = []
        self.rejected_posts = []
        self.approved_reviews = []
        self.rejected_reviews = []

    def manage_new_location(self, location):
        self.locations_managed.append(location)

    def remove_managed_location(self, location):
        if location in self.locations_managed:
            self.locations_managed.remove(location)
        else:
            raise ValueError("Location not managed by this moderator")

    def approve_ad(self, ad):
        self.approved_ads.append(ad)
        ad.approved = True

    def reject_ad(self, ad):
        self.rejected_ads.append(ad)
        ad.approved = False

    def approve_post(self, post):
        self.approved_posts.append(post)
        post.approved = True

    def reject_post(self, post):
        self.rejected_posts.append(post)
        post.approved = False

    def approve_review(self, review):
        self.approved_reviews.append(review)
        review.approved = True

    def reject_review(self, review):
        self.rejected_reviews.append(review)
        review.approved = False

class Partner(Person):
    def __init__(self, first_name, last_name, username, email, password, business_name, phone, balance=0):
        super().__init__(first_name, last_name, username, email, password)
        self.ads = []
        self.events_sponsoring = []
        self.business_name = business_name
        self.balance = balance
        self.phone = phone

    def create_ad(self, ad):
        self.ads.append(ad)

#%% Places

class Location:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.pois = [] #List of Points of Interest (POIs) associated with this location

    def add_poi(self, poi):
        self.pois.append(poi)


class POI:
    def __init__(self, name, description, points):
        self.name = name
        self.description = description
        self.points = points
        self.reviews = []
        self.ads = []
        self.posts = []
        self.events = []

    def get_points(self):
        return self.points

    def add_review(self, review):
        self.reviews.append(review)

    def add_ad(self, ad):
        self.ads.append(ad)

    def add_post(self, post):
        self.posts.append(post)

    def add_event(self, event):
        self.events.append(event)


#%% User Content

class Content:
    def __init__(self, uploaded_by, deleted_by=None):
        self.uploaded_by = uploaded_by
        self.deleted_by = deleted_by

class Review(Content):
    def __init__(self, uploaded_by, rating, text, deleted_by=None):
        super().__init__(uploaded_by, deleted_by)
        self.value = rating # 1-5
        self.content = text

        def set_value(self, value):
            if 1 <= value <= 5:
                self.value = value
            else:
                raise ValueError("Value must be between 1 and 5")

class Post(Content):
    def __init__(self, uploaded_by, src, caption, deleted_by=None):
        super().__init__(uploaded_by, deleted_by)
        self.src = src
        self.caption = caption
        self.likes = [] #by users
        self.comments = [] #by users

class Comment(Content):
    def __init__(self, uploaded_by, text, deleted_by=None):
        super().__init__(uploaded_by, deleted_by)
        self.text = text

#%% Partner Content

class Extras:
    def __init__(self, title, description, start_date, end_date):
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date

class Ad(Extras):
    def __init__(self, title, description, start_date, end_date, cost, status):
        super().__init__(title, description, start_date, end_date)
        self.status = "approved" or "rejected" or "deleted"
        self.cost = cost

class Event(Extras):
    def __init__(self, title, description, start_date, end_date, txt, src):
        super().__init__(title, description, start_date, end_date)
        self.txt = txt
        self.src = src

    def add_sponsor(self, partner):
        self.sponsors.append(partner)
