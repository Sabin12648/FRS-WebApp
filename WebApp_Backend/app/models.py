#models.py
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import JSONB

# class User(db.Model):
#     __tablename__ = 'frs_db'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     address = db.Column(db.String(200), nullable=True)
#     face_encoding = db.Column(db.Text, nullable=True)
#     mobile_number = db.Column(db.String(20), nullable=True)
#     photo_filename = db.Column(db.String(120), nullable=True)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'email': self.email,
#             'address': self.address,
#             'face_encoding': self.face_encoding,
#             'mobile_number': self.mobile_number,
#             'photo_filename': self.photo_filename
#         }

class Registration(db.Model):
    __tablename__ = 'registration'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
        }



class User(db.Model):
    __tablename__ = 'frs_db'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    address = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    mobile_number = db.Column(db.String, nullable=True)
    face_encoding = db.Column(JSONB, nullable=False)
    photo_filename = db.Column(db.String, nullable=False)
    applicant_id = db.Column(db.String(100), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "face_encoding": self.face_encoding,
            "mobile_number": self.mobile_number,
            "photo_filename": self.photo_filename,
            "applicant_id":self.applicant_id 
        }
