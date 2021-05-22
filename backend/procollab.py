from app import app, db
from app.models import User,Dept,Project,Position

# Making commands available in shell
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Dept': Dept, 'Project': Project, 'Position': Position }
