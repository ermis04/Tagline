from src.navigator import Navigator
import tkinter as tk
from src.components import *


def sign_in(email, password):
    #TODO: Sign in function. Check the credentials and navigate to the home page if they are correct.
    #4 cases. if business, if user, if moderator, if not registered. 
    print("Sign in function called with email:", email, "and password:", password)
    Navigator.navigate("user_home")
    
def create_signIn_page(frame):
    # profile page
    title(frame, "Sign In")

      # Email Label and Entry
    email_label = tk.Label(frame, text="Email:")
    email_label.pack()
    email_entry = tk.Entry(frame)
    email_entry.pack()

    # Password Label and Entry
    password_label = tk.Label(frame, text="Password:")
    password_label.pack()
    password_entry = tk.Entry(frame, show="*")  # Hides password input
    password_entry.pack()

    btn1 = tk.Button(frame, text="Next", command=lambda: sign_in(email_entry.get(), password_entry.get()))
    btn1.pack()


    link(frame, "Don't have an account? Sign Up", action=lambda: Navigator.navigate("signUp"))
    link(frame, "Continue as a business", action=lambda: Navigator.navigate("businessSignUp"))



