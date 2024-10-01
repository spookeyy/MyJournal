from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.user_preference import UserPreference
from app import db

bp = Blueprint('user_preferences', __name__)

@bp.route('/preferences', methods=['GET'])
@jwt_required()
def get_preferences():
    user_id = get_jwt_identity()
    preferences = UserPreference.query.filter_by(user_id=user_id).first()
    if not preferences:
        preferences = UserPreference(user_id=user_id)
        db.session.add(preferences)
        db.session.commit()
    return jsonify({
        'theme': preferences.theme,
        'font': preferences.font
    }), 200

@bp.route('/preferences', methods=['PUT'])
@jwt_required()
def update_preferences():
    data = request.get_json()
    user_id = get_jwt_identity()
    preferences = UserPreference.query.filter_by(user_id=user_id).first()
    if not preferences:
        preferences = UserPreference(user_id=user_id)
        db.session.add(preferences)
    
    preferences.theme = data.get('theme', preferences.theme)
    preferences.font = data.get('font', preferences.font)
    db.session.commit()
    return jsonify({'message': 'Preferences updated successfully'}), 200