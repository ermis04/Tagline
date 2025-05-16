from src.navigator import Navigator
import tkinter as tk
from src.components import *

######################### Static data start #########################

locations = [
    {"name": "Patras", "sights": 5, "progress": 0.8},
    {"name": "Athens", "sights": 12, "progress": 0.5},
    {"name": "Thessaloniki", "sights": 8, "progress": 0.3},
    {"name": "Heraklion", "sights": 6, "progress": 0.6},
    {"name": "Chania", "sights": 4, "progress": 0.2}
]

uncharted = [
    {"name": "Rhodes", "sights": 7, "progress": 0.4},
    {"name": "Ioannina", "sights": 3, "progress": 0.1},
    {"name": "Volos", "sights": 5, "progress": 0.35}
]

posts = [
    {"username": "nat12", "image": "patras.jpg", "likes": 120, "avatar": "profile.jpeg"},
    {"username": "local4", "image": "patras.jpg", "likes": 204, "avatar": "profile.jpeg"},
    {"username": "bitmap", "image": "patras.jpg", "likes": 69, "avatar": "profile.jpeg"},
]

######################### Static data end #########################



def create_user_home_page(root_frame):
    canvas = tk.Canvas(root_frame, bg=WHITE, highlightthickness=0)
    canvas.pack(side='left', fill='both', expand=True)
    scrollbar = tk.Scrollbar(root_frame, orient='vertical', command=canvas.yview)
    scrollbar.pack(side='right', fill='y')
    canvas.configure(yscrollcommand=scrollbar.set)
    scrollable_frame = tk.Frame(canvas, bg=WHITE)
    canvas.create_window((0, 0), window=scrollable_frame, anchor='nw')

    def on_configure(event):
        canvas.configure(scrollregion=canvas.bbox("all"))

    scrollable_frame.bind("<Configure>", on_configure)

    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")

    canvas.bind_all("<MouseWheel>", _on_mousewheel)  

    #components
    navbar(scrollable_frame)

    horizontal_cards_section(
        scrollable_frame,
        locations,
        title_text="Exploring",
        action=lambda event, loc: Navigator.navigate('area', props=loc)
    )

    horizontal_post_section( scrollable_frame, posts, action=lambda event, post: Navigator.navigate('feed', props=post))

    horizontal_cards_section(
        scrollable_frame,
        uncharted,
        title_text="Uncharted",
        action=lambda event, loc: Navigator.navigate('area', props=loc)
    )



    # Navigation buttons
    tk.Button(scrollable_frame, text="Profile", command=lambda: Navigator.navigate("profile")).pack(pady=5)
    tk.Button(scrollable_frame, text="Feed", command=lambda: Navigator.navigate("feed")).pack(pady=5)
    tk.Button(scrollable_frame, text="Event", command=lambda: Navigator.navigate("event")).pack(pady=5)
    tk.Button(scrollable_frame, text="Poi", command=lambda: Navigator.navigate("poi")).pack(pady=5)




def navbar(frame):
    nav = tk.Frame(frame, bg=WHITE)
    nav.pack(fill='x', padx=10, pady=5)
    icon(nav, 'src/img/profile.jpeg', action=lambda event: Navigator.navigate("editProfile"), size=30, is_profile_pic=True).pack(side='left')

    right_side = tk.Frame(nav, bg=WHITE)
    right_side.pack(side='right')
    friends_and_points = tk.Frame(right_side, bg=WHITE)
    friends_and_points.pack()
    
    icon(friends_and_points, 'src/img/friends.jpg', action=lambda event: Navigator.navigate("friends"), size=30).pack(side='left', padx=(0, 10))

    points_frame = tk.Frame(friends_and_points, bg=WHITE)
    points_frame.pack(side='left')

    h2(points_frame, "1082", BLUE).pack()
    p(points_frame, "points", BLUE).pack()



def horizontal_cards_section(parent, locations, title_text="Exploring", action=None):
    title(parent, title_text)
    canvas = tk.Canvas(parent, bg=WHITE, highlightthickness=0, height=220)
    canvas.pack(fill='x', expand=False)

    scrollbar = tk.Scrollbar(parent, orient='horizontal', command=canvas.xview)
    scrollbar.pack(fill='x')
    canvas.configure(xscrollcommand=scrollbar.set)

    card_frame = tk.Frame(canvas, bg=WHITE)
    canvas.create_window((0, 0), window=card_frame, anchor='nw')

    def on_configure(event):
        canvas.configure(scrollregion=canvas.bbox("all"))

    card_frame.bind("<Configure>", on_configure)

    def on_drag_start(event):
        canvas.scan_mark(event.x, event.y)

    def on_drag_motion(event):
        canvas.scan_dragto(event.x, 0, gain=1)

    canvas.bind("<ButtonPress-1>", on_drag_start)
    canvas.bind("<B1-Motion>", on_drag_motion)

    for loc in locations:
        image_path = f"src/img/{loc['name'].lower()}.jpg"
        card_widget = card(
            card_frame,
            image_path,
            action=lambda event, loc=loc: (
                action(event, loc) if action else Navigator.navigate('area', data=loc)
            ),
            text=loc["name"],
            current_location=(loc["name"] == "Patras"),
            sights=loc.get("sights", 0),
            progress=loc.get("progress", 0) * 100
        )
        card_widget.pack(side='left', padx=10, pady=10)


def horizontal_post_section(parent, posts, title_text="Popular Nearby", action=None):
    title(parent, title_text)

    canvas = tk.Canvas(parent, bg=WHITE, highlightthickness=0, height=200)
    canvas.pack(fill='x', expand=False)

    scrollbar = tk.Scrollbar(parent, orient='horizontal', command=canvas.xview)
    scrollbar.pack(fill='x')
    canvas.configure(xscrollcommand=scrollbar.set)

    card_frame = tk.Frame(canvas, bg=WHITE)
    canvas.create_window((0, 0), window=card_frame, anchor='nw')

    def on_configure(event):
        canvas.configure(scrollregion=canvas.bbox("all"))

    card_frame.bind("<Configure>", on_configure)

    def on_drag_start(event):
        canvas.scan_mark(event.x, event.y)

    def on_drag_motion(event):
        canvas.scan_dragto(event.x, 0, gain=1)

    canvas.bind("<ButtonPress-1>", on_drag_start)
    canvas.bind("<B1-Motion>", on_drag_motion)

    for post in posts:
        card_widget = post_card(
            card_frame,
            image_path=f"src/img/{post['image']}",
            username=post["username"],
            likes=post["likes"],
            avatar_path=f"src/img/{post['avatar']}",
            action=lambda event, post=post: (
                action(event, post) if action else Navigator.navigate('feed', props=post)
            ),
        )
        card_widget.pack(side='left', padx=10, pady=10)