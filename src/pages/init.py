import tkinter as tk
from src.navigator import Navigator
from src.pages.editProfile import create_edit_profile_page
from src.pages.home import create_user_home_page 
from src.pages.friends import create_friends_page
from src.pages.area import create_area_page
from src.pages.poi import create_poi_page
from src.pages.event import create_event_page
from src.pages.feed import create_feed_page
from src.pages.profile import create_profile_page
from src.pages.signIn import create_signIn_page
from src.pages.signUp import create_signUp_page




def create_pages(root):
    
    #edit profile page
    editProfile = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(editProfile=editProfile)
    create_edit_profile_page(editProfile)

    #profile page
    profile = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(profile=profile)
    create_profile_page(profile)

    #User friends page
    friends = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(friends=friends)
    create_friends_page(friends)


    # Area page
    area = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(area=area)
    create_area_page(area)
    
    #POI page
    poi = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(poi=poi)
    create_poi_page(poi)

    # Event Page
    event = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(event=event)
    create_event_page(event)

    #feed page
    feed = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(feed=feed)
    create_feed_page(feed)

    # Sign Up page
    signUp = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(signUp=signUp)
    create_signUp_page(signUp)

    # Sign In page
    signIn = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(signIn=signIn)
    create_signIn_page(signIn)

    #User home page
    home = tk.Frame(root, padx=5, pady=10, bg="white")
    Navigator.register_page(user_home=home)
    create_user_home_page(home)


    for page in (home, profile,friends, editProfile, area, poi, event, feed, signIn, signUp):
        page.place(relx=0, rely=0, relwidth=1, relheight=1)
    
    return home