import tkinter as tk
# from src.components import *
# from src.component_params import CARD_SIZE, CARD_RADIUS, CARD_X, CARD_Y, PROGRESS_VALUE, IMG_PATH, BLUE, BLACK, WHITE
from src.navigator import Navigator
from src.pages.init import create_pages

root = tk.Tk()
root.geometry("295x639")
root.title("Tagline")

# def on_profile_click(event):
#     print("Profile picture clicked!")
#     Navigator.navigate("profile")

# def friends_tab(event):
#     print("Friends tab opened!")
#     Navigator.navigate("friends")
#     # home.pack_forget()
#     # friends.pack(fill='both', expand=True)

# title(home, "Exploring")
# h1(home, "Patras")
# h2(home, "Patras")
# p(home, "Patras")
# link(home, "Patras")
# icon(home, 'src/img/patras.jpg', action=on_profile_click, is_profile_pic=True)
# icon(home, 'src/img/friends.jpg', action=friends_tab)
# icon(home, 'src/img/loc.jpg', action=friends_tab, size=20)
# long_button(home, "Patras", action=friends_tab, image_path='src/img/loc.jpg')

# card(home, 'src/img/patras.jpg', action=friends_tab, text="Patras", current_location=True)

# card(friends, 'src/img/friends.jpg', action=friends_tab, text="Friends", current_location=False)


starting_page = create_pages(root)
starting_page.pack(fill='both', expand=True)

root.mainloop()