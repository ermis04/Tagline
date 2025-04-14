import tkinter as tk
from src.components import *
from src.component_params import CARD_SIZE, CARD_RADIUS, CARD_X, CARD_Y, PROGRESS_VALUE, IMG_PATH, BLUE, BLACK, WHITE


root = tk.Tk()
root.geometry("295x639")
root.title("Tagline")

container = tk.Frame(root, padx=5, pady=10, bg=WHITE)
container.pack(fill='both', expand=True)


def on_profile_click(event):
    print("Profile picture clicked!")

def friends_tab(event):
    print("Friends tab opened!")

title(container, "Exploring")
h1(container, "Patras")
h2(container, "Patras")
p(container, "Patras")
link(container, "Patras")
icon(container, 'src/img/patras.jpg', action=on_profile_click, is_profile_pic=True)
icon(container, 'src/img/friends.jpg', action=friends_tab)
icon(container, 'src/img/loc.jpg', action=friends_tab, size=20)
long_button(container, "Patras",  action=friends_tab)
long_button(container, "Patras",  action=friends_tab, image_path='src/img/loc.jpg')

root.mainloop()