from src.navigator import Navigator
import tkinter as tk
from src.components import *

def create_feed_page(frame):
    # feed page
    title(frame, "Feed")
    btn1 = tk.Button(frame, text="Go back", command=lambda: Navigator.navigate("user_home"))
    btn1.pack()


