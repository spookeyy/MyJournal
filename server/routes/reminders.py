from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.reminder import Reminder
from server import db
from datetime import datetime

bp = Blueprint('reminders', __name__)

@bp.route('/reminders', methods=['POST'])
@jwt_required()
def create_reminder():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_reminder = Reminder(
        user_id=user_id,
        title=data['title'],
        description=data.get('description'),
        reminder_time=datetime.fromisoformat(data['reminder_time'])
    )
    db.session.add(new_reminder)
    db.session.commit()
    return jsonify({'message': 'Reminder created successfully', 'id': new_reminder.id}), 201

@bp.route('/reminders', methods=['GET'])
@jwt_required()
def get_reminders():
    user_id = get_jwt_identity()
    reminders = Reminder.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': rem.id,
        'title': rem.title,
        'description': rem.description,
        'reminder_time': rem.reminder_time.isoformat(),
        'created_at': rem.created_at.isoformat()
    } for rem in reminders]), 200

@bp.route('/reminders/<int:reminder_id>', methods=['PUT'])
@jwt_required()
def update_reminder(reminder_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    reminder = Reminder.query.filter_by(id=reminder_id, user_id=user_id).first()
    if not reminder:
        return jsonify({'message': 'Reminder not found'}), 404
    reminder.title = data.get('title', reminder.title)
    reminder.description = data.get('description', reminder.description)
    reminder.reminder_time = datetime.fromisoformat(data.get('reminder_time', reminder.reminder_time.isoformat()))
    db.session.commit()
    return jsonify({'message': 'Reminder updated successfully'}), 200

@bp.route('/reminders/<int:reminder_id>', methods=['DELETE'])
@jwt_required()
def delete_reminder(reminder_id):
    user_id = get_jwt_identity()
    reminder = Reminder.query.filter_by(id=reminder_id, user_id=user_id).first()
    if not reminder:
        return jsonify({'message': 'Reminder not found'}), 404
    db.session.delete(reminder)
    db.session.commit()
    return jsonify({'message': 'Reminder deleted successfully'}), 200