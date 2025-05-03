import mysql.connector
import os
from dotenv import load_dotenv
from class_definitions import User, Location, POI, Review, Post, Ad, Event

# Load environment variables from .env.dev
load_dotenv(".env.dev")

# Establish a connection to the database
connection = mysql.connector.connect(
    host="localhost",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)



def get_data(tables, rows, class_implementation):
    data_array = []

    cursor = connection.cursor()
    cursor.execute(f"SELECT {rows} FROM {tables}")

    rows = cursor.fetchall()
    for row in rows:
        data_array.append(class_implementation(*row))
    cursor.close()

    return data_array

users = get_data('User', 'first_name, last_name, email, password, username, points', User)
locations = get_data('Location', 'name, description', Location)
pois = get_data('POI', 'name, description, points', POI)
reviews = get_data('Review', 'uploaded_by, value, content', Review)
posts = get_data('Post', 'uploaded_by, src, caption', Post)
ads = get_data('Ad', 'title, description, uploaded_by, start_date, end_date, approved, cost', Ad)
events = get_data('Event', 'title, description, uploaded_by, start_date, end_date, approved', Event)
