from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_jwt_identity, jwt_required, JWTManager
from server import db
from server.models.user import User

auth_bp = Blueprint('auth', __name__)
jwt = JWTManager()

blacklist = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


# CORS
@auth_bp.after_request 
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = User(
        username=data['username'],
        email=data['email'],
        # password_hash=data['password']
    )
    username.set_password(data['password'])
    db.session.add(username)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'message': 'Login successful'
        })
    
    return jsonify({'message': 'Invalid credentials'}), 401


# @auth_bp.route('/auth/logout', methods=['POST'])
# @jwt_required()
# def logout():
    jti = get_jwt()['jti']
    blacklist.add(jti)
    return jsonify({'message': 'Successfully logged out'})

#cookies and sessions
@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logged out successfully'})
    response.set_cookie('access_token', '', expires=0)
    response.set_cookie('refresh_token', '', expires=0)
    return response

@auth_bp.route('/auth/verify', methods=['GET'])
@jwt_required()
def verify_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }), 200

@auth_bp.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({'access_token': access_token})

#TODO websockets and channels

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }), 200