from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(64), index=True, unique=False, nullable=False)
    lastname = db.Column(db.String(64), index=True, unique=False)
    contactnum = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    dept = db.Column(db.Integer(), db.ForeignKey('Dept.id'))
    projects = db.relationship('Project', backref='user')
    isstud = db.Column(db.Boolean)

    def __repr__(self):
        return '<User {}>'.format(self.firstname)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Dept(db.Model):
    __tablename__ = "Dept"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), index=True, unique=True, nullable=False)
    users = db.relationship('User', backref='department')

    def __repr__(self):
        return '<Dept {}>'.format(self.name)


class Position(db.Model):
    __tablename__ = "Position"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False, nullable=False)
    desc = db.Column(db.String(256), index=True, unique=False, nullable=False)
    projects = db.relationship('Project', backref='pos')


class Project(db.Model):
    __tablename__ = "Project"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True, nullable=False)
    position = db.Column(db.Integer(), db.ForeignKey('Position.id'))
    ideaBy = db.Column(db.Integer(), db.ForeignKey('User.id'))

@login.user_loader
def load_user(id):
    return User.query.get(int(id))