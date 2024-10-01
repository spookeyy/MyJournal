import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    # Get the path to the 'server' directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # Construct the path to the database file
    DB_PATH = os.path.join(BASE_DIR, 'instance', 'myjournal.db')
    
    # Ensure the 'instance' directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{DB_PATH}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-secret'