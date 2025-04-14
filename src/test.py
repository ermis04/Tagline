import tkinter as tk

root = tk.Tk()
root.geometry('300x400')
root.title('Tkinter Hub')

main_frame = tk.Frame(root)
main_frame.pack(fill=tk.BOTH, expand=True)

page_1 = tk.Frame(main_frame)
page_1_lb = tk.Label(page_1, text='Start Page', font=('Bold', 20))
page_1_lb.pack()

page_2 = tk.Frame(main_frame)
page_2_lb = tk.Label(page_2, text='Home', font=('Bold', 20))
page_2_lb.pack()

page_3 = tk.Frame(main_frame)
page_3_lb = tk.Label(page_3, text='Menu', font=('Bold', 20))
page_3_lb.pack()

page_4 = tk.Frame(main_frame)
page_4_lb = tk.Label(page_4, text='About', font=('Bold', 20))
page_4_lb.pack()

# Funciones de cambio de página
def open_page1():
    page_1.pack()
    page_2.pack_forget()
    page_3.pack_forget()
    page_4.pack_forget()

def open_page2():
    page_1.pack_forget()
    page_2.pack()
    page_3.pack_forget()
    page_4.pack_forget()

def open_page3():
    page_1.pack_forget()
    page_2.pack_forget()
    page_3.pack()
    page_4.pack_forget()

def open_page4():
    page_1.pack_forget()
    page_2.pack_forget()
    page_3.pack_forget()
    page_4.pack()

# Botones de navegación
nav_frame = tk.Frame(root)

btn_page1 = tk.Button(nav_frame, text='Start Page', font=('Bold', 12), bg='#1877f2', fg='white', width=12, command=open_page1)
btn_page1.pack(side=tk.LEFT, padx=10)

btn_page2 = tk.Button(nav_frame, text='Home', font=('Bold', 12), bg='#1877f2', fg='white', width=12, command=open_page2)
btn_page2.pack(side=tk.LEFT, padx=10)

btn_page3 = tk.Button(nav_frame, text='Menu', font=('Bold', 12), bg='#1877f2', fg='white', width=12, command=open_page3)
btn_page3.pack(side=tk.LEFT, padx=10)

btn_page4 = tk.Button(nav_frame, text='About', font=('Bold', 12), bg='#1877f2', fg='white', width=12, command=open_page4)
btn_page4.pack(side=tk.LEFT, padx=10)

nav_frame.pack(side=tk.TOP, pady=10)

root.mainloop()