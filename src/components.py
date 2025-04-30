import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk, ImageDraw
from src.component_params import CARD_SIZE, CARD_RADIUS, CARD_X, CARD_Y, PROGRESS_VALUE, IMG_PATH, BLUE, BLACK, WHITE


#%% TEXTS

def title(parent, text):
    label = tk.Label(parent, text=text, font=("Helvetica Neue", 30, "bold"), fg=BLUE, bg=WHITE)
    label.pack(anchor='w')
    return label

def h1(parent, text, color=BLACK):
    label = tk.Label(parent, text=text, font=("Helvetica Neue", 22, "bold"), fg=color, bg=WHITE)
    label.pack(anchor='w')
    return label

def h2(parent, text, color=BLACK):
    label = tk.Label(parent, text=text, font=("Helvetica Neue", 18, "bold"), fg=color, bg=WHITE)
    label.pack(anchor='w')
    return label

def p(parent, text, color=BLACK):
    label = tk.Label(parent, text=text, font=("Helvetica Neue", 15, "normal"), fg=color, bg=WHITE)
    label.pack(anchor='w')
    return label

def link(parent, text, color=BLACK, action=None):
    button = tk.Button(
        parent,
        text=text,
        font=("Helvetica Neue", 15, "underline"),
        fg=color,
        bg=parent['bg'],
        bd=0,
        command=action if action else lambda: print("Link clicked")
    )
    button.pack(anchor='w')
    return button

#%% IMAGES

def make_image(path, size, is_profile_pic=False):
    img = Image.open(path).resize((size, size)).convert("RGBA")
    if is_profile_pic:
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        img.putalpha(mask)
    return ImageTk.PhotoImage(img)

def icon(parent, path, action, pos=None, is_profile_pic=False, size=50):
    img = make_image(path, size, is_profile_pic=is_profile_pic)
    lbl = tk.Label(parent, image=img, bd=0, bg=WHITE)
    lbl.image = img
    if pos is not None:
        lbl.place(x=pos[0], y=pos[1])
    else:
        lbl.pack(anchor='w')
    lbl.bind("<Button-1>", lambda event: action(event) if action else None)
    return lbl

#%% LONG BUTTONS

# Draw rounded rectangle

def long_button(parent, text, action, pos=None, image_path=None):
    canvas = tk.Canvas(parent, bg=WHITE, bd=0, highlightthickness=0, height=70)
    canvas.pack(fill='x')

    # Draw rounded rectangle using arcs and rectangles
    width = canvas.winfo_reqwidth()
    radius = 25
    canvas.create_arc(0, 0, 2 * radius, 2 * radius, start=90, extent=90, fill=BLUE, outline=BLUE)
    canvas.create_arc(width - 2 * radius, 0, width, 2 * radius, start=0, extent=90, fill=BLUE, outline=BLUE)
    canvas.create_arc(0, 50 - 2 * radius, 2 * radius, 50, start=180, extent=90, fill=BLUE, outline=BLUE)
    canvas.create_arc(width - 2 * radius, 50 - 2 * radius, width, 50, start=270, extent=90, fill=BLUE, outline=BLUE)
    canvas.create_rectangle(radius, 0, width - radius, 50, fill=BLUE, outline=BLUE)
    canvas.create_rectangle(0, radius, width, 50 - radius, fill=BLUE, outline=BLUE)

    if image_path:
        img = make_image(image_path, 30)  # Adjust size as needed
        canvas.image = img
        canvas.create_image(50, 25, image=img, anchor='center')  # Adjust position as needed

    canvas.create_text(width // 2, 25, text=text, fill=WHITE, font=("Helvetica Neue", 15, "bold"))

    # Bind click event to the canvas
    canvas.bind("<Button-1>", lambda event: action(event) if action else None)
    return canvas

#%% CARDS

def card(parent, path, action, pos=None, size=150, text="", current_location=False, sights=5, progress=40):
    # Create base frame with rounded feel (visual only — not clipped)
    card_frame = tk.Frame(parent, width=size, height=size * 1.3, bg=WHITE, bd=0, highlightthickness=0)
    card_frame.pack_propagate(False)

    bg_img = make_image(path, size, is_profile_pic=False)
    bg_label = tk.Label(card_frame, image=bg_img, bd=0)
    bg_label.image = bg_img
    bg_label.place(relwidth=1, relheight=1)

    # "You are here" label
    if current_location:
        loc_label = tk.Label(
            card_frame, text="📍 You are here",
            font=("Helvetica Neue", 12), fg='white', bg=BLACK
        )
        loc_label.place(relx=0.05, rely=0.05, anchor='nw')

    # City name (bold)
    city_label = tk.Label(
        card_frame, text=text,
        font=("Helvetica Neue", 18, 'bold'), fg='white', bg=BLACK
    )
    city_label.place(relx=0.05, rely=0.65, anchor='nw')

    # Subtitle ("5 sights")
    subtitle_label = tk.Label(
        card_frame, text=f"{sights} sights",
        font=("Helvetica Neue", 12), fg='white', bg=BLACK
    )
    subtitle_label.place(relx=0.05, rely=0.78, anchor='nw')

    # Custom styled progress bar
    style = ttk.Style()
    style.theme_use('default')
    style.configure("Rounded.Horizontal.TProgressbar",
                    troughcolor='#FFFFFF',
                    bordercolor='#FFFFFF',
                    background='#0040FF',
                    thickness=8)
    style.layout("Rounded.Horizontal.TProgressbar", [
        ('Horizontal.Progressbar.trough',
         {'children': [('Horizontal.Progressbar.pbar',
                        {'side': 'left', 'sticky': 'ns'})],
          'sticky': 'nswe'})
    ])

    progress_bar = ttk.Progressbar(
        card_frame,
        style="Rounded.Horizontal.TProgressbar",
        orient="horizontal",
        length=size - 40,
        mode="determinate"
    )
    progress_bar['value'] = progress
    progress_bar.place(relx=0.5, rely=0.93, anchor='center')

    # Click binding
    card_frame.bind("<Button-1>", lambda event: action(event) if action else None)
    bg_label.bind("<Button-1>", lambda event: action(event) if action else None)

    # Layout
    if pos:
        card_frame.place(x=pos[0], y=pos[1])
    else:
        card_frame.pack(side='left', padx=10, pady=10)

    return card_frame

def create_progress_bar(parent):
    style = ttk.Style()
    style.theme_use('clam')
    style.configure("custom.Horizontal.TProgressbar",
                    troughcolor='white',
                    background='#0047FF',
                    thickness=10,
                    bordercolor='white',
                    lightcolor='#0047FF',
                    darkcolor='#0047FF')
    bar = ttk.Progressbar(parent, style="custom.Horizontal.TProgressbar", orient="horizontal",
                          length=140, mode="determinate")
    bar.place(x=80, y=CARD_Y + CARD_SIZE[1] - 20)
    bar['value'] = PROGRESS_VALUE
    return bar


def post_card(parent, image_path, username, likes, avatar_path=None, action=None, size=120):
    card_frame = tk.Frame(parent, width=size, height=size * 1.4, bg=WHITE, bd=0, highlightthickness=0)
    card_frame.pack_propagate(False)

    # Background image
    bg_img = make_image(image_path, size,is_profile_pic=False)
    bg_label = tk.Label(card_frame, image=bg_img, bd=0)
    bg_label.image = bg_img
    bg_label.place(x=0, y=0, relwidth=1, relheight=1)

    # Profile pic (small circle)
    if avatar_path:
        avatar_img = make_image(avatar_path, 24, is_profile_pic=True)
        avatar_lbl = tk.Label(card_frame, image=avatar_img, bd=0)
        avatar_lbl.image = avatar_img
        avatar_lbl.place(relx=0.05, rely=0.05, anchor='nw')

    # Username
    username_lbl = tk.Label(
        card_frame, text=username,
        font=("Helvetica Neue", 10, 'bold'),
        fg='white', bg=BLACK
    )
    username_lbl.place(relx=0.2, rely=0.07, anchor='nw')

    # Likes count
    likes_lbl = tk.Label(
        card_frame, text=f"♥ {likes}",
        font=("Helvetica Neue", 10),
        fg='white', bg=BLACK
    )
    likes_lbl.place(relx=0.05, rely=0.9, anchor='sw')

    # Bind click
    card_frame.bind("<Button-1>", lambda event: action(event) if action else None)
    bg_label.bind("<Button-1>", lambda event: action(event) if action else None)

    return card_frame


#TODO: Add a component for an input
