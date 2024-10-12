from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.category import Category
from server import db

bp = Blueprint('categories', __name__)

@bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_category = Category(name=data['name'], user_id=user_id)
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully', 'id': new_category.id}), 201

@bp.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    categories = Category.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': cat.id, 'name': cat.name} for cat in categories]), 200

@bp.route('/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=category_id, user_id=user_id).first()
    if not category:
        return jsonify({'message': 'Category not found'}), 404
    category.name = data['name']
    db.session.commit()
    return jsonify({'message': 'Category updated successfully'}), 200

@bp.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=category_id, user_id=user_id).first()
    if not category:
        return jsonify({'message': 'Category not found'}), 404
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully'}), 200