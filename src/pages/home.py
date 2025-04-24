from src.navigator import Navigator
import tkinter as tk
from src.components import *


def create_user_home_page(frame):
    icon(frame, 'src/img/friends.jpg', action=lambda event: Navigator.navigate("friends"), size=20) #friends Icon
    title(frame, "Home") # Title of the page
    

    btn1 = tk.Button(frame, text="Profile", command=lambda: Navigator.navigate("profile"))
    btn1.pack()

    btn2 = tk.Button(frame, text="Feed", command=lambda: Navigator.navigate("feed"))
    btn2.pack()

    btn3 = tk.Button(frame, text="Event", command=lambda: Navigator.navigate("event"))
    btn3.pack()

    btn4 = tk.Button(frame, text="Edit profile", command=lambda: Navigator.navigate("editProfile"))
    btn4.pack()

    btn5 = tk.Button(frame, text="Poi", command=lambda: Navigator.navigate("poi"))
    btn5.pack()

    btn6 = tk.Button(frame, text="Area", command=lambda: Navigator.navigate("area"))
    btn6.pack()





    title(frame, "Exploring")
    h1(frame, "Patras")
    # icon(frame, 'src/img/patras.jpg', action=print("hi"), is_profile_pic=True)
    # icon(frame, 'src/img/loc.jpg', action=print("hi"), size=20)
    # long_button(frame, "Patras", action=print("hi"), image_path='src/img/loc.jpg')

    # card(frame, 'src/img/patras.jpg', action=print("hi"), text="Patras", current_location=True)


