
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS
from flask_session import Session
from flask_jwt_extended import JWTManager
import logging

from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configure logging
    logging.basicConfig(level=logging.DEBUG)


    app.config.from_object(Config)
    
    app.config['UPLOAD_FOLDER'] = '/home/sabin/Desktop/FRS-system/submitted_faces'

    db.init_app(app)
    migrate.init_app(app, db)

    # CORS configuration
    CORS(app)  # Allow CORS for all domains by default

     # Configure session
    app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem-based session storage
    Session(app)

     # Initialize JWT
    jwt = JWTManager(app)

    with app.app_context():
        from app.controllers import user_controller
        app.register_blueprint(user_controller.user_bp)

        # Uncomment if you need to create tables
        # db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
