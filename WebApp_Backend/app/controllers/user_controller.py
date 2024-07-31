
import os
from flask import Flask, request, jsonify, Blueprint
from app.models import User, Registration
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
from app import db


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
        # Add the "_converted" suffix before the file extension
        filename, file_extension = os.path.splitext(photo_filename)
        converted_photo_filename = f"{filename}_converted{file_extension}"
        image_path = os.path.join(UPLOAD_FOLDER, converted_photo_filename)

        # Check if the file exists
        if not os.path.isfile(image_path):
            return jsonify({"error": "Image not found"}), 404

        # Open the image file in binary mode and encode it to base64
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        # Return the base64 encoded image
        return jsonify({"image": f"data:image/jpeg;base64,{encoded_string}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
            
            # Generate a new filename with "_converted" suffix
            filename, file_extension = os.path.splitext(file_path)
            rgb_file_path = f"{filename}_converted.jpeg"
            
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

        # print(f"Loading image file for face recognition: {photo_path}")
        # Load the image file into a variable
        submitted_image = face_recognition.load_image_file(photo_path)

        if submitted_image is None:
            raise ValueError("Could not load image, ensure the path is correct and the image file is accessible.")

        # print(f"Image shape: {submitted_image.shape}")
        # print(f"Image dtype: {submitted_image.dtype}")

        # Ensure the image has three color channels
        if submitted_image.shape[2] == 4:
            # print("Image has 4 channels, converting to RGB.")
            submitted_image = cv2.cvtColor(submitted_image, cv2.COLOR_RGBA2RGB)
        elif submitted_image.shape[2] == 1:
            # print("Image is grayscale, converting to RGB.")
            submitted_image = cv2.cvtColor(submitted_image, cv2.COLOR_GRAY2RGB)
        elif submitted_image.shape[2] != 3:
            raise ValueError('Unsupported image type, must be an RGB image with 3 channels.')

        # Convert the image to RGB (if not already in RGB format)
        rgb_image = np.ascontiguousarray(submitted_image[:, :, ::-1])
        # Print the shape and dtype of the image
        # print(f"RGB image shape: {rgb_image.shape}")
        # print(f"RGB image dtype: {rgb_image.dtype}")

        # Find face locations
        face_locations = face_recognition.face_locations(rgb_image, number_of_times_to_upsample=2)
        if not face_locations:
            print("No faces found in the image.")
            return None

        # Print face locations
        # print(f"Face locations: {face_locations}")

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
            # print(f"Saving uploaded file to: {file_path}")
            file.save(file_path)
            # print(f"File saved: {file_path}")

            jpeg_file_path = convert_image_to_rgb(file_path)
            if jpeg_file_path is None:
                return jsonify({'message': 'Error converting image to RGB'}), 500

            # Ensure the file was saved correctly
            if os.path.exists(jpeg_file_path):
                if jpeg_file_path != file_path:
                    os.remove(file_path)  # Remove the original file if different
                    # print(f"Original file removed: {file_path}")
                else:
                # print(f"Converted file does not exist: {jpeg_file_path}")
                    return jsonify({'message': 'File conversion failed'}), 500

                # print(f"Extracting face encoding from: {jpeg_file_path}")
                face_encoding = extract_face_encoding(jpeg_file_path)
                if face_encoding is not None:2
                face_encoding_list = face_encoding.tolist()
                face_encoding_json = json.dumps(face_encoding_list)
                face_encodings.append(face_encoding_list)
                new_filename = os.path.basename(jpeg_file_path)
                new_user = User(photo_filename=new_filename, face_encoding=face_encoding_list)
                db.session.add(new_user)
                db.session.commit()
                # print(f"User added with photo: {new_filename}")
            else:
                os.remove(jpeg_file_path)
                print(f"No face encoding found, removed file: {jpeg_file_path}")
        else:
            return jsonify({'message': 'Unsupported file type'}), 400

    return jsonify({'message': 'Files successfully uploaded', 'encodings': face_encodings}), 200


@user_bp.route('/upload_user', methods=['POST'])
def upload_user():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if 'photo' not in request.files:
        print('No file part')
        return jsonify({'message': 'No file part'}), 400

    file = request.files['photo']

    if file.filename == '':
        print('No file part or empty filename')
        return jsonify({'message': 'No file part or empty filename'}), 400

    if not allowed_file(file.filename):
        print('Unsupported file type')
        return jsonify({'message': 'Unsupported file type'}), 400

    name = request.form.get('name')
    applicant_id = request.form.get('applicantId')
    address = request.form.get('address')
    email = request.form.get('email')
    mobile_number = request.form.get('mobile_number')

    # Log form data to check if it's received
    print('Form Data:')
    print('Name:', name)
    print('Applicant ID:', applicant_id)
    print('Address:', address)
    print('Email:', email)
    print('Mobile Number:', mobile_number)

    if not all([name, applicant_id, address, email, mobile_number]):
        return jsonify({'message': 'Missing form data'}), 400

    original_filename = secure_filename(file.filename)
    filename = f"{name}-{applicant_id}.jpeg"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Convert the image to RGB
    jpeg_file_path = convert_image_to_rgb(file_path)
    if jpeg_file_path is None:
        return jsonify({'message': 'Error converting image to RGB'}), 500

    if os.path.exists(jpeg_file_path) and jpeg_file_path != file_path:
        os.remove(file_path)  # Remove original if different

    # Extract face encoding
    face_encoding = extract_face_encoding(jpeg_file_path)

    if isinstance(face_encoding, np.ndarray) and face_encoding.size > 0:
        face_encoding_list = face_encoding.tolist()
        new_user = User(
            name=name,
            applicant_id=applicant_id,
            address=address,
            email=email,
            mobile_number=mobile_number,
            photo_filename=filename,
            face_encoding=face_encoding_list
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'File and data successfully uploaded', 'encoding': face_encoding_list}), 200
    else:
        os.remove(jpeg_file_path)  # Remove file if encoding failed
        return jsonify({'message': 'No face encoding found'}), 500


# @user_bp.route('/users/<int:user_id>/update_photo', methods=['PUT'])
# # @jwt_required()
# def update_user_photo(user_id):
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     if 'photo' not in request.files:
#         return jsonify({'message': 'No file part'}), 400

#     file = request.files['photo']
#     if file.filename == '':
#         return jsonify({'error': 'Empty filename'}), 400

#     if file and allowed_file(file.filename):
#         # Secure the filename and save the new photo
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(UPLOAD_FOLDER, filename)
#         file.save(file_path)

#         # Convert the image to RGB and save it as JPEG
#         jpeg_file_path = convert_image_to_rgb(file_path)
#         if jpeg_file_path is None:
#             return jsonify({'message': 'Error converting image to RGB'}), 500

#         # Ensure the new file was saved correctly
#         if os.path.exists(jpeg_file_path):
#             if jpeg_file_path != file_path:
#                 os.remove(file_path)  # Remove the original file if different
#         else:
#             return jsonify({'message': 'File conversion failed'}), 500

#         # Remove the old photo file if it exists
#         old_photo_path = os.path.join(UPLOAD_FOLDER, user.photo_filename)
#         if os.path.exists(old_photo_path):
#             os.remove(old_photo_path)

#         # Update the user's photo filename in the database
#         user.photo_filename = os.path.basename(jpeg_file_path)
#         db.session.commit()

#         return jsonify({'message': 'Photo updated successfully', 'new_filename': user.photo_filename}), 200
#     else:
#         return jsonify({'message': 'Unsupported file type'}), 400

@user_bp.route('/users/<int:user_id>/update_photo', methods=['PUT'])
# @jwt_required()
def update_user_photo(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'photo' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    if file and allowed_file(file.filename):
        # Use the same filename as the existing photo
        filename = user.photo_filename if user.photo_filename else secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # Remove the existing photo if it exists
        if os.path.exists(file_path):
            os.remove(file_path)

        file.save(file_path)

        # Convert the image to RGB and save it as JPEG with the same filename
        jpeg_file_path = convert_image_to_rgb(file_path)
        if jpeg_file_path is None:
            return jsonify({'message': 'Error converting image to RGB'}), 500

        # Ensure the new file was saved correctly
        if os.path.exists(jpeg_file_path):
            if jpeg_file_path != file_path:
                os.remove(file_path)  # Remove the original file if different
        else:
            return jsonify({'message': 'File conversion failed'}), 500

        # Update the user's photo filename in the database if it was not set before
        if not user.photo_filename:
            user.photo_filename = os.path.basename(jpeg_file_path)
            db.session.commit()

        return jsonify({'message': 'Photo updated successfully', 'new_filename': user.photo_filename}), 200
    else:
        return jsonify({'message': 'Unsupported file type'}), 400



@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    user = Registration.query.filter_by(username=username).first()

    if user and password:  # Ensure to check the password correctly
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "User deleted successfully"}), 200