from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from server.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()
cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

# entries, categories, tags, media, reminders, user_preferences
    from server.routes import auth
    app.register_blueprint(auth.auth_bp)
    # app.register_blueprint(entries.auth_bp)
    # app.register_blueprint(categories.auth_bp)
    # app.register_blueprint(tags.auth_bp)
    # app.register_blueprint(media.auth_bp)
    # app.register_blueprint(reminders.auth_bp)
    # app.register_blueprint(user_preferences.auth_bp)

    return app