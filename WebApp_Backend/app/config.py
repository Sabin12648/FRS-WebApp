# import os

# class Config:
#     SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:1234@localhost/postgres'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

import os

class Config:
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:1234@localhost/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'
