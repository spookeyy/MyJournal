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

    from server.routes import auth, entries, categories, tags, media, reminders, user_preferences

    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(entries.bp)
    app.register_blueprint(categories.bp)
    app.register_blueprint(tags.bp)
    app.register_blueprint(media.bp)
    app.register_blueprint(reminders.bp)
    app.register_blueprint(user_preferences.bp)

    from server.models import category, entry, media_file, reminder, tag, user, user_preference

    with app.app_context():
        db.create_all()

    return app