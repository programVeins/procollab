from flask import jsonify, request
from app import app, db #import the variable 'app' from module 'app'
from app.models import User, Contact
from app.validations import validate
from app.login import logincheck
from flask_login import current_user, login_user, logout_user
from datetime import datetime

@app.route('/api/postsignup', methods=['GET','POST'])
def postSignUp():
    UD = request.json["userData"]
    u = User(firstname = UD["firstname"], lastname = UD["lastname"], email = UD["email"],
    contactnum = UD["contactnum"])
    a = validate(u.email, u.contactnum)
    print(u)
    if a == 0:
        u.set_password(UD["password"])
        db.session.add(u)
        db.session.commit()
        return jsonify({'success':1})
    else:
        if a == 1:
            err = "Email already exists"
        if a == 2:
            err = "Phone number already exists"
        if a == 3:
            err = "Email and Phone number already exist" 
        print(jsonify({'error': err}))       
        return jsonify({'error': a})

@app.route('/api/postlogin', methods=['GET','POST'])
def postLogin():
    UD = request.json["userData"]
    usrMail = UD['email']
    usrPwd = UD['password']
    a = logincheck(usrMail,usrPwd)
    logout_user()
    print(current_user.is_authenticated)
    if current_user.is_authenticated:
        return jsonify({"auth": 10})
    else:
        if a == 1:
            return jsonify({"auth": 1})
        elif a == 2:
            return jsonify({"auth": 2})
        else:
            user = User.query.filter_by(email=usrMail).first()
            login_user(user)
            return {"auth":0}
    
@app.route('/api/logout')
def logout():
    logout_user()
    print("logged out")
    return {"auth": -1}

@app.route('/api/accountdeets', methods=['GET','POST'])
def accountdeets():
    currentUserEmail = request.json["CUE"]['currentUserEmail']
    user = User.query.filter_by(email=currentUserEmail).first()
    print("Accountdeets sent!")
    return jsonify({
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "contactnum": user.contactnum,
    })

@app.route('/api/admin')
def admin():
    users = User.query.all()
    contactMessages = Contact.query.all()
    contacts = []
    usersResponse = []
    for user in users:
        d = user.__dict__
        if '_sa_instance_state' in d:
            del d['_sa_instance_state']
        usersResponse.append(d)

    for cont in contactMessages:
        d = cont.__dict__
        if '_sa_instance_state' in d:
            del d['_sa_instance_state']
        contacts.append(d)
    admin = {
        'contacts' : contacts,
        'users' : usersResponse
    }
    return jsonify(admin)

@app.route('/api/load')
def load():
    return jsonify({"load": "success"})

# New routes designed for TAI

@app.route('/api/contactus', methods=['GET','POST'])
def contactus():
    CD = request.json['contact']
    newContactMess = Contact(name = CD["name"], email = CD["email"], city = CD["city"], contactnum = CD["contactnum"], product = CD["product"], message = CD["message"])
    db.session.add(newContactMess)
    db.session.commit()
    return jsonify({"contact": "success"})
