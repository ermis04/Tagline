#%% Entities

class Person:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

class User(Person):
    def __init__(self, password, name, email, username):
        super().__init__(name, email, password)
        self.username = username
        self.points = 0

    def add_points(self, points): #after visiting POI you get points
        self.points += points

class Moderator(Person):
    def __init__(self, name, email, password):
        super().__init__(name, email, password)
        self.locations_managed = []
        self.approved_ads = []
        self.rejected_ads = []

    def manage_new_location(self, location):
        self.locations_managed.append(location)

    def approve_ad(self, ad):
        self.approved_ads.append(ad)

        if ad in set(self.rejected_ads):
            self.rejected_ads.remove(ad)
            self.approved_ads.append(ad)

    def reject_ad(self, ad):
        self.rejected_ads.append(ad)

class Partner(Person):
    def __init__(self, name, email, password):
        super().__init__(name, email, password)
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


#%% Content

class Review:
    def __init__(self, left_by, value, content):
        self.left_by = left_by
        self.value = value # 1-5
        self.content = content

        def set_value(self, value):
            if 1 <= value <= 5:
                self.value = value
            else:
                raise ValueError("Value must be between 1 and 5")

class Post:
    def __init__(self, uploaded_by, src, caption):
        self.uploaded_by = uploaded_by
        self.src = src
        self.caption = caption

class Extras:
    def __init__(self, title, description, uploaded_by, start_date, end_date):
        self.title = title
        self.description = description
        self.uploaded_by = uploaded_by
        self.start_date = start_date
        self.end_date = end_date

class Ad(Extras):
    def __init__(self, title, description, uploaded_by, start_date, end_date):
        super().__init__(title, description, uploaded_by, start_date, end_date)

class Event(Extras):
    def __init__(self, title, description, uploaded_by, start_date, end_date):
        super().__init__(title, description, uploaded_by, start_date, end_date)
        self.sponsors = []

    def add_sponsor(self, partner):
        self.sponsors.append(partner)