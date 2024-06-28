
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



# # # @user_bp.route('/login', methods=['POST'])
# # # def login():
# # #     data = request.get_json()
# # #     username = data.get('username')
# # #     password = data.get('password')

# # #     if not username or not password:
# # #         return jsonify({'message': 'Missing username or password'}), 400

# # #     user = Registration.query.filter_by(username=username).first()

# # #     if not user or not password:
# # #         return jsonify({'message': 'Invalid username or password'}), 401
    
# # #      # Create a new token with the user id inside
# # #     access_token = create_access_token(identity=user.id)

# # #     # Login successful, you can generate a session token or return user information
# # #     return jsonify({'message': 'Login successful', 'access_token': access_token}), 200


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
from flask import Flask, request, jsonify, Blueprint, current_app
from app.models import User, db, Registration
from flask_jwt_extended import create_access_token, jwt_required
import face_recognition
from werkzeug.utils import secure_filename
import logging
from PIL import Image
import numpy as np
import tempfile
import cv2
import traceback

# Define the directory where images are stored
# Ensure this matches the actual directory structure on your system
UPLOAD_FOLDER = '/home/sabin/Desktop/FRS-system/submitted_faces'

# Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

UPLOAD_FOLDER = '/home/sabin/Desktop/FRS-system/submitted_faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def convert_image_to_rgb(file_path):
    try:
        with Image.open(file_path) as img:
            print(f"Original image mode: {img.mode}")
            if img.mode != 'RGB':
                img = img.convert('RGB')
                print(f"Converted image mode: {img.mode}")
            rgb_file_path = file_path.rsplit('.', 1)[0] + '.jpeg'
            img.save(rgb_file_path, 'JPEG')
            print(f"Image saved as JPEG: {rgb_file_path}")
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
        # Load image with OpenCV
        submitted_image = cv2.imread(photo_path)

         # Check if the image was loaded correctly
        if submitted_image is None:
            raise ValueError("Could not load image, ensure the path is correct and the image file is accessible.")


         # Print out shape and dtype of the image
        print(f"Image shape: {submitted_image.shape}")
        print(f"Image dtype: {submitted_image.dtype}")

        if submitted_image.dtype != 'uint8' or len(submitted_image.shape) != 3 or submitted_image.shape[2] != 3:
            raise ValueError('Unsupportedddd image type, must be 8bit gray or RGB image.')
        else:
            print("Image is in correct format (8bit RGB).")
        
        # Try converting the image to grayscale and back to RGB (if necessary)
        if submitted_image.shape[2] == 3:
            print("Converting image to grayscale and back to RGB for testing purposes.")
            gray_image = cv2.cvtColor(submitted_image, cv2.COLOR_RGB2GRAY)
            submitted_image = cv2.cvtColor(gray_image, cv2.COLOR_GRAY2RGB)

        # Extract face encodings   
        submitted_face_encodings = face_recognition.face_encodings(submitted_image)
        if len(submitted_face_encodings) > 0:
            print("Face encoding found.")
            return submitted_face_encodings[0]
        else:
            print("No face encodings found.")
            return None
    except Exception as e:
        print("Error extracting face encoding:", e)
        traceback.print_exc()
        return None
    
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
                file.save(file_path)

                # Convert the image to RGB and JPEG format
                jpeg_file_path = convert_image_to_rgb(file_path)
                if jpeg_file_path is None:
                    return jsonify({'message': 'Error converting image to RGB'}), 500
                
                os.remove(file_path)  # Remove the original file

                 # Ensure the converted file exists and is accessible
                if not os.path.exists(jpeg_file_path):
                    print(f"Converted file does not exist: {jpeg_file_path}")
                    return jsonify({'message': 'File conversion failed'}), 500

                # Extract face encoding
                face_encoding = extract_face_encoding(jpeg_file_path)
                if face_encoding is not None:
                    face_encodings.append(face_encoding)
                else:
                    os.remove(jpeg_file_path)  # Remove file if no face encoding is found

            else:
                return jsonify({'message': 'Unsupported file type'}), 400

    return jsonify({'message': 'Files successfully uploaded'}), 200

    
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
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)

    # Login successful, you can generate a session token or return user information
    return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
# Register the blueprint with the main Flask app
# app.register_blueprint(user_bp)

# if __name__ == '__main__':
#     app.run(debug=True)  # Run the Flask application in debug mode
