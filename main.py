import tkinter as tk
from src.navigator import Navigator
from src.pages.init import create_pages

root = tk.Tk()
root.geometry("295x639")
root.title("Tagline")

starting_page = create_pages(root)
starting_page.pack(fill='both', expand=True)

root.mainloop()

