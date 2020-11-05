from flask import Flask #Flash convention: classes are PascalCased
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS


app = Flask(__name__) #Initialize app as a Flash class for the module 'app' (dir)
CORS(app)
app.config.from_object(Config)
#Now the folder (module) 'app' is registered as the variable 'app'
db = SQLAlchemy(app) #DB class
migrate = Migrate(app, db) #Migration script class
login = LoginManager(app)


from app import routes, models
