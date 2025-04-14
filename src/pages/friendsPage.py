from src.navigator import Navigator
import tkinter as tk
from src.components import *

def create_friends_page(frame):
    # Friends page
    title(frame, "Friends")
    btn1 = tk.Button(frame, text="Go back", command=lambda: Navigator.navigate("home"))
    btn1.pack()


