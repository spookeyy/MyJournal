from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.entry import Entry
from server.app import db

bp = Blueprint('entries', __name__)

@bp.route('/entries', methods=['POST'])
@jwt_required()
def create_entry():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_entry = Entry(user_id=user_id, title=data['title'], content=data['content'])
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({'message': 'Entry created successfully'}), 201

@bp.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    user_id = get_jwt_identity()
    entries = Entry.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': entry.id,
        'title': entry.title,
        'content': entry.content,
        'created_at': entry.created_at
    } for entry in entries]), 200

@bp.route('/entries/<int:entry_id>', methods=['PUT'])
@jwt_required()
def update_entry(entry_id):
    data = request.get_json()
    entry = Entry.query.get(entry_id)
    if entry:
        entry.title = data['title']
        entry.content = data['content']
        db.session.commit()
        return jsonify({'message': 'Entry updated successfully'}), 200
    else:
        return jsonify({'message': 'Entry not found'}), 404
    
@bp.route('/entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_entry(entry_id):
    entry = Entry.query.get(entry_id)
    if entry:
        db.session.delete(entry)
        db.session.commit()
        return jsonify({'message': 'Entry deleted successfully'}), 200
    else:
        return jsonify({'message': 'Entry not found'}), 404