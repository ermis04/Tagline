from src.navigator import Navigator
import tkinter as tk
from src.components import *


def sign_up(name, phone, photo_path, email, password):
    Navigator.navigate("user_home")
    #TODO: logic for creating a new user account in the database. 


def create_signUp_page(frame):
    # profile page
    icon(frame, 'src/img/back.png', action=lambda event: Navigator.navigate("signIn"), size=20)
    title(frame, "Sign Up")

    # Name
    name_label = tk.Label(frame, text="Name:")
    name_label.pack()
    name_entry = tk.Entry(frame)
    name_entry.pack()

    # Phone
    phone_label = tk.Label(frame, text="Phone:")
    phone_label.pack()
    phone_entry = tk.Entry(frame)
    phone_entry.pack()

    # Photo
    photo_label = tk.Label(frame, text="Photo Path:")
    photo_label.pack()
    photo_entry = tk.Entry(frame)
    photo_entry.pack()

    # Email
    email_label = tk.Label(frame, text="Email:")
    email_label.pack()
    email_entry = tk.Entry(frame)
    email_entry.pack()

    # Password
    password_label = tk.Label(frame, text="Password:")
    password_label.pack()
    password_entry = tk.Entry(frame, show="*")
    password_entry.pack()

    long_button(frame, "Sign Up", action=lambda event: sign_up(name_entry.get(), phone_entry.get(), photo_entry.get(), email_entry.get(), password_entry.get()))

