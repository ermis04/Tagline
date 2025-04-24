import tkinter as tk
# from src.navigator import Navigator
# from src.pages.profilePage import create_profile_page
# from src.pages.homePage import create_home_page
# from src.pages.friendsPage import create_friends_page


# def create_pages(root):
#     # profile page
#     profile = tk.Frame(root, padx=5, pady=10, bg="white")
#     Navigator.register_page(profile=profile)
#     create_profile_page(profile)
#
#     # friends page
#     friends = tk.Frame(root, padx=5, pady=10, bg="white")
#     Navigator.register_page(friends=friends)
#     create_friends_page(friends)
#
#     # home page
#     home = tk.Frame(root, padx=5, pady=10, bg="white")
#     Navigator.register_page(home=home)
#     create_home_page(home)
#
#     for page in (home, profile, friends):
#         page.place(relx=0, rely=0, relwidth=1, relheight=1)
#
#     return home