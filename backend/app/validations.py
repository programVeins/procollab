from app import app, db
from app.models import User


def validate(em):
    emx = User.query.filter_by(email=em).first()

    if (emx is not None):
        print('Email exists')
        return 1
    else:
        print('Validated 0')
        return 0
