from app import app, db
from app.models import User

def validate(em, cn):
    emx = User.query.filter_by(email=em).first()
    cnx = User.query.filter_by(contactnum=cn).first()

    if (emx is not None) and (cnx is None):
        print('Email exists')
        return 1
    elif (emx is None) and (cnx is not None):
        print('Phone exists')
        return 2
    elif (emx is not None) and (cnx is not None):
        print('Email and Phone exists')
        return 3
    else:
        print('Validated 0')
        return 0

        