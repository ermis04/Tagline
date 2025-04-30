from src.navigator import Navigator
import tkinter as tk
from src.components import *

def create_profile_page(frame):
    # profile page
    title(frame, "User_Name")
    btn1 = tk.Button(frame, text="Go back", command=lambda: Navigator.navigate("user_home"))
    btn1.pack()


