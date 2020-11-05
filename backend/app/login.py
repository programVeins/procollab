from app import app, db
from app.models import User

def logincheck(umail,upwd):
    isUserPresent = User.query.filter_by(email=umail).first()
    if (isUserPresent is None):
        print("Email not found")
        return 1
    else:
        temphash = isUserPresent.password_hash
        isPassRight = isUserPresent.check_password(upwd)
        if not isPassRight:
            print("Wrong Pass")
            return 2
        else:
            print("Authenticated")
            return 0