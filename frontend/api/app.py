from flask import (Flask, render_template, url_for, request, redirect)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import EmailType
from sqlalchemy import ForeignKey
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trippy.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    display_name = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.String(255), default="Hi, I'm new to Trippy!")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    Trip = db.relationship('Trip', backref='User', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    trip_country = db.Column(db.String(200), nullable=False)
    trip_bio = db.Column(db.String(200), nullable=True)
    trip_length = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Trip %r>' % self.id

class Feed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Feed %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return "Hello World"
    elif request.method == 'POST':
        user_email = request.form['email']
        user_password = request.form['password']
        user_display_name = request.form['display_name']
        new_user = User(email = user_email, password = user_password, display_name = user_display_name)

        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding user'
    else:
        return 'Post did not work'

@app.route('/delete/<int:id>', methods=['DELETE', 'GET'])
def delete(id):
    user_to_delete = User.query.get_or_404(id)

    try:
        db.session.delete(user_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/editprofile/<int:id>', methods=['GET', 'POST'])
def update(id):
    user_to_update = User.query.get_or_404(id)
    if request.method == 'POST':
        if request.form['bio'] != '':
            user_to_update.bio = request.form['bio']
        if request.form['display_name'] != '':
            user_to_update.display_name = request.form['display_name']
        print(request.form)
        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating your task'
                
    else:
        return 'Could not update'

    try:
        db.session.put(user_to_update)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

# if request.form['display_name']:
#             user_to_update.display_name = request.form['display_name']
# @app.route('/editaccinfo/<int:id>', methods=['GET', 'PUT'])
# def update(id):
#     user_to_update = User.query.get_or_404(id)
#     if request.method == 'POST':
#             user_to_update.email = request.form['email']
#             user_to_update.password = request.form['password']
        
#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your task'
            
#     else:
#         return 'Did not update email/password.'


#     try:
#         db.session.put(task_to_update)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem deleting that task'


if __name__ == "__main__":
    app.run(debug=True)
