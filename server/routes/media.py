from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from server.models.media_file import MediaFile
from app import db
import os

bp = Blueprint('media', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'mp4'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/media/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        entry_id = request.form.get('entry_id')
        new_media = MediaFile(entry_id=entry_id, file_type=file.content_type, file_path=file_path)
        db.session.add(new_media)
        db.session.commit()
        
        return jsonify({'message': 'File uploaded successfully', 'id': new_media.id}), 201
    return jsonify({'message': 'File type not allowed'}), 400

@bp.route('/media/<int:media_id>', methods=['GET'])
@jwt_required()
def get_file(media_id):
    media = MediaFile.query.get_or_404(media_id)
    return send_file(media.file_path, mimetype=media.file_type)

@bp.route('/media/<int:media_id>', methods=['DELETE'])
@jwt_required()
def delete_file(media_id):
    media = MediaFile.query.get_or_404(media_id)
    os.remove(media.file_path)
    db.session.delete(media)
    db.session.commit()
    return jsonify({'message': 'File deleted successfully'}), 200