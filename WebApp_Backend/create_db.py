from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from app.config import Config  # Adjusted import path based on your structure

# Create an engine using the URI from the Config class
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

# Check if the database exists; if not, create it
if not database_exists(engine.url):
    create_database(engine.url)
    print("Database created successfully.")
else:
    print("Database already exists.")
