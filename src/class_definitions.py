#%% Entities

class Person:
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

class User(Person):
    def __init__(self, password, first_name, last_name, email, username):
        super().__init__(first_name, last_name, email, password)
        self.username = username
        self.points = 0
        self.friends = []

    def add_points(self, points): #after visiting POI you get points
        self.points += points

    def add_friend(self, friend):
        if isinstance(friend, User):
            self.friends.append(friend)
        else:
            raise ValueError("Friend must be a User instance")

class Moderator(Person):
    def __init__(self, first_name, last_name, email, password):
        super().__init__(first_name, last_name, email, password)
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
    def __init__(self, first_name, last_name, email, password):
        super().__init__(first_name, last_name, email, password)
        self.ads = []

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
    def __init__(self, uploaded_by, approved):
        self.uploaded_by = uploaded_by
        self.approved = approved

class Review(Content):
    def __init__(self, uploaded_by, value, content):
        super().__init__(self.uploaded_by, self.approved)
        self.value = value # 1-5
        self.content = content

        def set_value(self, value):
            if 1 <= value <= 5:
                self.value = value
            else:
                raise ValueError("Value must be between 1 and 5")

class Post(Content):
    def __init__(self, uploaded_by, src, caption):
        super().__init__(self.uploaded_by, self.approved)
        self.src = src
        self.caption = caption


#%% Partner Content

class Extras(Content):
    def __init__(self, title, description, uploaded_by, start_date, end_date):
        super().__init__(self.uploaded_by)
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date

class Ad(Extras):
    def __init__(self, title, description, uploaded_by, start_date, end_date, approved):
        super().__init__(title, description, uploaded_by, start_date, end_date)
        self.approved = approved

class Event(Extras):
    def __init__(self, title, description, uploaded_by, start_date, end_date):
        super().__init__(title, description, uploaded_by, start_date, end_date)
        self.sponsors = []

    def add_sponsor(self, partner):
        self.sponsors.append(partner)