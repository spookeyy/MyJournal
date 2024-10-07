from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.tag import Tag
from server import db

bp = Blueprint('tags', __name__)

@bp.route('/tags', methods=['POST'])
@jwt_required()
def create_tag():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_tag = Tag(name=data['name'], user_id=user_id)
    db.session.add(new_tag)
    db.session.commit()
    return jsonify({'message': 'Tag created successfully', 'id': new_tag.id}), 201

@bp.route('/tags', methods=['GET'])
@jwt_required()
def get_tags():
    user_id = get_jwt_identity()
    tags = Tag.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': tag.id, 'name': tag.name} for tag in tags]), 200

@bp.route('/tags/<int:tag_id>', methods=['PUT'])
@jwt_required()
def update_tag(tag_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    tag = Tag.query.filter_by(id=tag_id, user_id=user_id).first()
    if not tag:
        return jsonify({'message': 'Tag not found'}), 404
    tag.name = data['name']
    db.session.commit()
    return jsonify({'message': 'Tag updated successfully'}), 200

@bp.route('/tags/<int:tag_id>', methods=['DELETE'])
@jwt_required()
def delete_tag(tag_id):
    user_id = get_jwt_identity()
    tag = Tag.query.filter_by(id=tag_id, user_id=user_id).first()
    if not tag:
        return jsonify({'message': 'Tag not found'}), 404
    db.session.delete(tag)
    db.session.commit()
    return jsonify({'message': 'Tag deleted successfully'}), 200