from src.navigator import Navigator
import tkinter as tk
from src.components import *

def create_feed_page(frame):
    frame.configure(bg=BLACK)  # Dark background


    icon(frame, 'src/img/back.png', action=lambda event: Navigator.navigate("user_home"), size=30)

    avatar_img = make_image("src/img/profile.jpeg", 30, is_profile_pic=True)
    frame.avatar_label = tk.Label(frame, image=avatar_img, bg='#0F111A')
    frame.avatar_label.image = avatar_img
    frame.avatar_label.place(x=20, y=20)

    frame.username_label = tk.Label(frame, text="username", font=("Helvetica Neue", 14, "bold"), fg="white", bg='#0F111A')
    frame.username_label.place(x=60, y=25)

    frame.location_label = tk.Label(frame, text="📍 Unknown", font=("Helvetica Neue", 12), fg="white", bg='#0F111A')
    frame.location_label.place(relx=1.0, x=-20, y=30, anchor='ne')

    frame.post_img_label = tk.Label(frame, bg='#0F111A')
    frame.post_img_label.place(relx=0.5, rely=0.25, anchor='n')

    frame.likes_label = tk.Label(frame, text="♥ 0", font=("Helvetica Neue", 11), fg="white", bg='#0F111A')
    frame.likes_label.place(relx=1.0, x=-20, rely=0.88, anchor='ne')

    next_btn = tk.Button(
        frame,
        text="next post ⌄",
        font=("Helvetica Neue", 12, "bold"),
        fg="white",
        bg="#0047FF",
        activebackground="#0036C1",
        relief='flat',
        command=lambda: print("Go to next post")  # Replace with actual logic
    )
    next_btn.place(relx=0.5, rely=0.95, anchor='s')


    def load_navigation_data(props):
        if props:
            frame.username_label.config(text=props.get("username", "unknown"))

            location = props.get("location", "Unknown")
            frame.location_label.config(text=f"📍 {location}")

            avatar_path = f"src/img/{props.get('avatar', 'default_avatar.png')}"
            avatar_img = make_image(avatar_path, 30, is_profile_pic=True)
            frame.avatar_label.config(image=avatar_img)
            frame.avatar_label.image = avatar_img

            post_img = make_image(f"src/img/{props['image']}", 300, is_profile_pic=False)
            frame.post_img_label.config(image=post_img)
            frame.post_img_label.image = post_img

            frame.likes_label.config(text=f"♥ {props.get('likes', 0)}")

    frame.load_navigation_data = load_navigation_data




#TODO: implement the next post button