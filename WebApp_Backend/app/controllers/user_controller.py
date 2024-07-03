
# # # @user_bp.route('/users', methods=['GET'])
# # # @jwt_required()
# # # def get_users():
# # #     users = User.query.all()
# # #     print(users)  # Debug print
# # #     users_list = [user.to_dict() for user in users]
# # #     return jsonify(users_list), 200

# # # @user_bp.route('/users/<int:user_id>', methods=['PUT'])
# # # def update_user(user_id):
# # #     data = request.get_json()
    
# # #     # Fetch the existing user from the database
# # #     user = User.query.get(user_id)
# # #     if not user:
# # #         return jsonify({"message": "User not found"}), 404
    
# # #     # Update user attributes with new data
# # #     user.name = data.get('name', user.name)
# # #     user.email = data.get('email', user.email)
# # #     user.address = data.get('address', user.address)
# # #     user.face_encoding = data.get('face_encoding', user.face_encoding)
# # #     user.mobile_number = data.get('mobile_number', user.mobile_number)
# # #     user.photo_filename = data.get('photo_filename', user.photo_filename)
    
# # #     # Commit the changes to the database
# # #     db.session.commit()
    
# # #     # Return the updated user object as part of the response
# # #     updated_user = {
# # #         "id": user.id,
# # #         "name": user.name,
# # #         "email": user.email,
# # #         "address": user.address,
# # #         "face_encoding": user.face_encoding,
# # #         "mobile_number": user.mobile_number,
# # #         "photo_filename": user.photo_filename  # Ensure to include photo_filename
# # #         # Add other fields as needed
# # #     }
    
# # #     return jsonify(updated_user), 200


# # # @user_bp.route('/get_image/<photo_filename>', methods=['GET'])
# # # @jwt_required()
# # # def get_image(photo_filename):
# # #     try:
# # #         # Construct the full path to the image file
# # #         image_path = os.path.join(IMAGE_DIRECTORY, photo_filename)
        
# # #         # Check if the file exists
# # #         if not os.path.isfile(image_path):
# # #             return jsonify({"error": "Image not found"}), 404
        
# # #         # Open the image file in binary mode and encode it to base64
# # #         with open(image_path, "rb") as image_file:
# # #             encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
# # #         # Return the base64 encoded image
# # #         return jsonify({"image": f"data:image/jpeg;base64,{encoded_string}"}), 200
# # #     except Exception as e:
# # #         return jsonify({"error": str(e)}), 500
    
import os
from flask import Flask, request, jsonify, Blueprint
from app.models import User, db, Registration
from flask_jwt_extended import create_access_token, jwt_required
import face_recognition
from werkzeug.utils import secure_filename
import logging
from PIL import Image
import numpy as np
import cv2
import traceback
import json
import base64

# Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

UPLOAD_FOLDER = '/home/sabin/Desktop/FRS-system/submitted_faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

@user_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    print(users)  # Debug print
    users_list = [user.to_dict() for user in users]
    return jsonify(users_list), 200

@user_bp.route('/get_image/<photo_filename>', methods=['GET'])
@jwt_required()
def get_image(photo_filename):
    try:
        
        # Construct the full path to the image file
        image_path = os.path.join(UPLOAD_FOLDER, photo_filename)

        
        # Check if the file exists
        if not os.path.isfile(image_path):
            return jsonify({"error": "Image not found"}), 404
        
        # Open the image file in binary mode and encode it to base64
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            print (encoded_string)
        
        # Return the base64 encoded image
        return jsonify({"image": f"data:image/jpeg;base64,{encoded_string}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def convert_image_to_rgb(file_path):
#     try:
#         with Image.open(file_path) as img:
#             print(f"Original image mode: {img.mode}")
#             if img.mode != 'RGB':
#                 img = img.convert('RGB')
#                 print(f"Converted image mode: {img.mode}")
#             rgb_file_path = file_path.rsplit('.', 1)[0] + '.jpeg'
#             img.save(rgb_file_path, 'JPEG')
#             print(f"Image saved as JPEG: {rgb_file_path}")
#         return rgb_file_path
#     except Exception as e:
#         print(f"Error converting image to RGB: {e}")
#         return None

def convert_image_to_rgb(file_path):
    try:
        print(f"Attempting to open file: {file_path}")
        with Image.open(file_path) as img:
            print(f"Original image mode: {img.mode}")
            if img.mode != 'RGB':
                img = img.convert('RGB')
                print(f"Converted image mode: {img.mode}")
            else:
                print("Image is already in RGB mode.")
            
            # Generate a new filename if the original file is already JPEG
            if file_path.lower().endswith('.jpeg') or file_path.lower().endswith('.jpg'):
                rgb_file_path = file_path.rsplit('.', 1)[0] + '_converted.jpeg'
            else:
                rgb_file_path = file_path.rsplit('.', 1)[0] + '.jpeg'
            
            print(f"Saving image to: {rgb_file_path}")
            img.save(rgb_file_path, 'JPEG')
            print(f"Image saved as JPEG: {rgb_file_path}")
        
        # Check if the file was actually saved
        if os.path.exists(rgb_file_path):
            print(f"File successfully saved: {rgb_file_path}")
        else:
            print(f"File saving failed: {rgb_file_path}")
        
        return rgb_file_path
    except Exception as e:
        print(f"Error converting image to RGB: {e}")
        return None


def extract_face_encoding(photo_path):
    try:
        if not os.path.exists(photo_path):
            print(f"File does not exist: {photo_path}")
            return None

        print(f"Loading image file for face recognition: {photo_path}")
        # Load the image file into a variable
        submitted_image = face_recognition.load_image_file(photo_path)

        if submitted_image is None:
            raise ValueError("Could not load image, ensure the path is correct and the image file is accessible.")

        print(f"Image shape: {submitted_image.shape}")
        print(f"Image dtype: {submitted_image.dtype}")

        # Ensure the image has three color channels
        if submitted_image.shape[2] == 4:
            print("Image has 4 channels, converting to RGB.")
            submitted_image = cv2.cvtColor(submitted_image, cv2.COLOR_RGBA2RGB)
        elif submitted_image.shape[2] == 1:
            print("Image is grayscale, converting to RGB.")
            submitted_image = cv2.cvtColor(submitted_image, cv2.COLOR_GRAY2RGB)
        elif submitted_image.shape[2] != 3:
            raise ValueError('Unsupported image type, must be an RGB image with 3 channels.')

        # Convert the image to RGB (if not already in RGB format)
        rgb_image = np.ascontiguousarray(submitted_image[:, :, ::-1])
        # Print the shape and dtype of the image
        print(f"RGB image shape: {rgb_image.shape}")
        print(f"RGB image dtype: {rgb_image.dtype}")

        # Find face locations
        face_locations = face_recognition.face_locations(rgb_image, number_of_times_to_upsample=2)
        if not face_locations:
            print("No faces found in the image.")
            return None

        # Print face locations
        print(f"Face locations: {face_locations}")

        # Extract face encodings
        face_encodings = face_recognition.face_encodings(rgb_image, known_face_locations=face_locations, num_jitters=100)
        if face_encodings:
            print(f"Face encoding found.")
            return face_encodings[0]
        else:
            print("No face encodings found.")
            return None
    except Exception as e:
        print("Error extracting face encoding:", e)
        traceback.print_exc()
        return None


# def upload_photos():
#     if not os.path.exists(UPLOAD_FOLDER):
#         os.makedirs(UPLOAD_FOLDER)

#     if 'photos' not in request.files:
#         return jsonify({'message': 'No file part'}), 400

#     files = request.files.getlist('photos')
#     face_encodings = []

#     for file in files:
#         if file.filename == '':
#             return jsonify({'error': 'Empty filename'}), 400

#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file_path = os.path.join(UPLOAD_FOLDER, filename)
#             file.save(file_path)

#             jpeg_file_path = convert_image_to_rgb(file_path)
#             if jpeg_file_path is None:
#                 return jsonify({'message': 'Error converting image to RGB'}), 500

#             os.remove(file_path)  # Remove the original file

#             if not os.path.exists(jpeg_file_path):
#                 print(f"Converted file does not exist: {jpeg_file_path}")
#                 return jsonify({'message': 'File conversion failed'}), 500

#             face_encoding = extract_face_encoding(jpeg_file_path)
#             if face_encoding is not None:
#                 # Convert the face encoding to a list before serialization
#                 face_encoding_list = face_encoding.tolist()
#                 face_encoding_json = json.dumps(face_encoding_list)
#                 face_encodings.append(face_encoding_list)
#                 # Insert into the database using the new filename
#                 new_filename = os.path.basename(jpeg_file_path)
#                 # Insert into the database
#                 new_user = User(photo_filename=new_filename, face_encoding=face_encoding_list)
#                 db.session.add(new_user)
#                 db.session.commit()
#             else:
#                 os.remove(jpeg_file_path)  # Remove file if no face encoding is found
#         else:
#             return jsonify({'message': 'Unsupported file type'}), 400

#     return jsonify({'message': 'Files successfully uploaded', 'encodings': face_encodings}), 200



@user_bp.route('/upload_photos', methods=['POST'])
def upload_photos():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if 'photos' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    files = request.files.getlist('photos')
    face_encodings = []

    for file in files:
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            print(f"Saving uploaded file to: {file_path}")
            file.save(file_path)
            print(f"File saved: {file_path}")

            jpeg_file_path = convert_image_to_rgb(file_path)
            if jpeg_file_path is None:
                return jsonify({'message': 'Error converting image to RGB'}), 500

            # Ensure the file was saved correctly
            if os.path.exists(jpeg_file_path):
                if jpeg_file_path != file_path:
                    os.remove(file_path)  # Remove the original file if different
                    print(f"Original file removed: {file_path}")
            else:
                print(f"Converted file does not exist: {jpeg_file_path}")
                return jsonify({'message': 'File conversion failed'}), 500

            print(f"Extracting face encoding from: {jpeg_file_path}")
            face_encoding = extract_face_encoding(jpeg_file_path)
            if face_encoding is not None:
                face_encoding_list = face_encoding.tolist()
                face_encoding_json = json.dumps(face_encoding_list)
                face_encodings.append(face_encoding_list)
                new_filename = os.path.basename(jpeg_file_path)
                new_user = User(photo_filename=new_filename, face_encoding=face_encoding_list)
                db.session.add(new_user)
                db.session.commit()
                print(f"User added with photo: {new_filename}")
            else:
                os.remove(jpeg_file_path)
                print(f"No face encoding found, removed file: {jpeg_file_path}")
        else:
            return jsonify({'message': 'Unsupported file type'}), 400

    return jsonify({'message': 'Files successfully uploaded', 'encodings': face_encodings}), 200

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    user = Registration.query.filter_by(username=username).first()

    if not user or not password:
        return jsonify({'message': 'Invalid username or password'}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({'message': 'Login successful', 'access_token': access_token}), 200


