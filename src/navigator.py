import tkinter as tk

class Navigator:
    _pages={}

    @classmethod
    def register_page(cls, **pages):
        cls._pages.update(pages)
    
    @classmethod
    def navigate(cls, page_name):
        if page_name in cls._pages:
            cls._pages[page_name].tkraise()