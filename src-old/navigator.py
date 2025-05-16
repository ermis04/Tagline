import tkinter as tk

class Navigator:
    _pages={}

    @classmethod
    def register_page(cls, **pages):
        cls._pages.update(pages)
    
    @classmethod
    def navigate(cls, page_name, props=None):
        if page_name in cls._pages:
            cls._pages[page_name].tkraise()
            page = cls._pages[page_name]
        
            # If the page has a 'load_data' method, pass the data
            if hasattr(page, 'load_navigation_data') and callable(getattr(page, 'load_navigation_data')):
                page.load_navigation_data(props)
            
            page.tkraise()
        else:
            print(f"Page '{page_name}' not found.")