
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_cors import CORS
# from flask_session import Session
# from flask_jwt_extended import JWTManager
# import logging

# from .config import Config

# db = SQLAlchemy()
# migrate = Migrate()

# def create_app():
#     app = Flask(__name__)

#     # Configure logging
#     logging.basicConfig(level=logging.INFO)

#     app.config.from_object(Config)
#     app.config['UPLOAD_FOLDER'] = '/home/sabin/Desktop/FRS-system/submitted_faces'

#     # Initialize extensions
#     db.init_app(app)
#     migrate.init_app(app, db)
#     CORS(app)
#     Session(app)
#     JWTManager(app)

#     with app.app_context():
#         # Import and register blueprints
#         from app.controllers.user_controller import user_bp
#         app.register_blueprint(user_bp)

#         # Uncomment if you need to create tables
#         # db.create_all()

#     return app

# if __name__ == "__main__":
#     app = create_app()
#     app.run(debug=True)


from flask import Flask, send_from_directory 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_session import Session
from flask_jwt_extended import JWTManager
import logging

from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__, static_folder='/home/sabin/Desktop/FRS-WEBAPP/FRS-WebApp/WebApp_Frontend/dist')

    # Configure logging
    logging.basicConfig(level=logging.INFO)

    app.config.from_object(Config)
    app.config['UPLOAD_FOLDER'] = '/home/sabin/Desktop/FRS-system/submitted_faces'

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    Session(app)
    JWTManager(app)

    with app.app_context():
        # Import and register blueprints
        from .controllers.user_controller import user_bp
        app.register_blueprint(user_bp)

        # Uncomment if you need to create tables
        # db.create_all()

    # Static file routes
    @app.route('/<path:path>', methods=['GET'])
    def static_proxy(path):
        app.logger.info(f"Serving static file: {path}")
        return send_from_directory(app.static_folder, path)

    @app.route('/', methods=['GET'])
    def index():
        app.logger.info("Serving index.html")
        return send_from_directory(app.static_folder, 'index.html')

    return app
