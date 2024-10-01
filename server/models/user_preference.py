from server import db
from datetime import datetime

class UserPreference(db.Model):
    __tablename__ = 'user_preference'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    theme = db.Column(db.String(100), default='light')
    font = db.Column(db.String(100), default='default')
 
    def __repr__(self):
        return f'<UserPreference {self.theme}>'