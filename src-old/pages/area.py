from src.navigator import Navigator
import tkinter as tk
from src.components import *


def create_area_page(frame):
    icon(frame, 'src/img/back.png', action=lambda event: Navigator.navigate("user_home"), size=20)
    frame.title_label = title(frame, "Area_Name")







    def load_navigation_data(props):
        if props:
            print("Area Page Received data:", props)
            frame.title_label.config(text=props.get("name", "Unknown Area"))

    frame.load_navigation_data = load_navigation_data



