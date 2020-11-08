# procollab

### A place where college students/faculty can post people needed for projects with a specfic skillset and to search for projects to undertake

## Installation

* Frontend

    Install node modules with `npm install`. Follow up with `npm start` to run the frontend at port 3000

* Backend

    Create a virtual environment using `python3 -m venv venv` and start it with `source venv/bin/activate`. Proceed to install all dependencies with `pip3 install -r requirements.txt`

    Migration Scripts are run by these commands:
    1. `flask db init`
    2. `flask db migrate -m "message"`
    3. `flask db upgrade`

    This makes sure that the data models are converted to the schema and store in the sqlite database

    Finally, start server with `flask run` on port 5000


### Demo : [ProCollab](https://procollab.vercel.app/)
