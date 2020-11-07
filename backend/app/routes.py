from flask import jsonify, request
from app import app, db  # import the variable 'app' from module 'app'
from app.models import User, Dept, Position, Project
from app.validations import validate
from app.login import logincheck
from flask_login import current_user, login_user, logout_user
from datetime import datetime


@app.route('/api/postsignup', methods=['GET', 'POST'])
def postSignUp():
    UD = request.json["userData"]
    u = User(firstname=UD["firstname"], lastname=UD["lastname"], email=UD["email"], isstud=UD["isstud"])
    a = validate(u.email)
    print(u)
    if a == 0:
        u.set_password(UD["password"])
        d = Dept.query.filter_by(name=UD["dept"]).first()
        u.dept = d.id
        db.session.add(u)
        db.session.commit()
        return jsonify({'success': 1})
    else:
        if a == 1:
            err = "Email already exists"
        print(jsonify({'error': err}))
        return jsonify({'error': a})


@app.route('/api/postlogin', methods=['GET', 'POST'])
def postLogin():
    UD = request.json["userData"]
    usrMail = UD['email']
    usrPwd = UD['password']
    a = logincheck(usrMail, usrPwd)
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
            return {"auth": 0}


@app.route('/api/logout')
def logout():
    logout_user()
    print("logged out")
    return {"auth": -1}


@app.route('/api/accountdeets', methods=['GET', 'POST'])
def accountdeets():
    currentUserEmail = request.json["CUE"]['currentUserEmail']
    user = User.query.filter_by(email=currentUserEmail).first()
    print("Accountdeets sent!")
    return jsonify({
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "dept": user.dept,

    })


@app.route('/api/projdeets')
def projdeets():
    users = User.query.all()
    users_final = []
    projects = Project.query.all()
    projects_final = []
    positions = Position.query.all()
    positions_final = []
    for project in projects:
        d = project.__dict__
        if '_sa_instance_state' in d:
            del d['_sa_instance_state']
        projects_final.append(d)
    for user in users:
        d = user.__dict__
        if '_sa_instance_state' in d:
            del d['_sa_instance_state']
        users_final.append(d)
    for position in positions:
        d = position.__dict__
        if '_sa_instance_state' in d:
            del d['_sa_instance_state']
        positions_final.append(d)

    return jsonify({
        "projects" : projects_final,
        "users" : users_final,
        "positions" : positions_final
        })

    @app.route('/api/load')
    def load():
        return jsonify({"load": "success"})



