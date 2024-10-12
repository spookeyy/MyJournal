import os
import sys

# Add the parent directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from datetime import datetime, timedelta
from server import create_app, db
from server.models.user import User
from server.models.user_preference import UserPreference
from server.models.tag import Tag
from server.models.reminder import Reminder
from server.models.media_file import MediaFile
from server.models.entry import Entry
from server.models.category import Category

def seed_database():
    app = create_app()
    with app.app_context():
        # Create users
        user1 = User(username="johndoe", email="johndoe@example.com")
        user1.set_password("password123")
        user2 = User(username="janedoe", email="janedoe@example.com")
        user2.set_password("password456")

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create user preferences
        pref1 = UserPreference(user_id=user1.id, theme="dark", font="Arial")
        pref2 = UserPreference(user_id=user2.id, theme="light", font="Roboto")

        db.session.add_all([pref1, pref2])
        db.session.commit()

        # Create categories
        cat1 = Category(name="Work", user_id=user1.id)
        cat2 = Category(name="Personal", user_id=user1.id)
        cat3 = Category(name="Travel", user_id=user2.id)

        db.session.add_all([cat1, cat2, cat3])
        db.session.commit()

        # Create tags
        tag1 = Tag(name="important", user_id=user1.id)
        tag2 = Tag(name="urgent", user_id=user1.id)
        tag3 = Tag(name="ideas", user_id=user2.id)

        db.session.add_all([tag1, tag2, tag3])
        db.session.commit()

        # Create entries
        entry1 = Entry(user_id=user1.id, title="First day at work", content="Today was my first day at the new job...", category_id=cat1.id)
        entry2 = Entry(user_id=user1.id, title="Weekend plans", content="This weekend I'm planning to...", category_id=cat2.id)
        entry3 = Entry(user_id=user2.id, title="Trip to Paris", content="I'm so excited about my upcoming trip to Paris...", category_id=cat3.id)

        db.session.add_all([entry1, entry2, entry3])
        db.session.commit()

        # Create media files
        media1 = MediaFile(entry_id=entry1.id, file_type="image", file_path="/uploads/work_desk.jpg")
        media2 = MediaFile(entry_id=entry3.id, file_type="image", file_path="/uploads/eiffel_tower.jpg")

        db.session.add_all([media1, media2])
        db.session.commit()

        # Create reminders
        reminder1 = Reminder(user_id=user1.id, title="Team meeting", description="Weekly team meeting", reminder_time=datetime.now() + timedelta(days=1))
        reminder2 = Reminder(user_id=user2.id, title="Buy souvenirs", description="Don't forget to buy souvenirs in Paris", reminder_time=datetime.now() + timedelta(days=7))

        db.session.add_all([reminder1, reminder2])
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()