import tkinter as tk
from src.components import *
from src.component_params import CARD_SIZE, CARD_RADIUS, CARD_X, CARD_Y, PROGRESS_VALUE, IMG_PATH, BLUE, BLACK, WHITE
from main import switch_page

title(home, "Exploring")
h1(home, "Patras")
h2(home, "Patras")
p(home, "Patras")
link(home, "Patras")
icon(home, 'src/img/patras.jpg', action=on_profile_click, is_profile_pic=True)
icon(home, 'src/img/friends.jpg', action=switch_page(home, friends), size=20)
icon(home, 'src/img/loc.jpg', action=friends_tab, size=20)
long_button(home, "Patras", action=friends_tab)
long_button(home, "Patras", action=friends_tab, image_path='src/img/loc.jpg')
