from flask import (Flask, render_template, url_for, request, redirect, session, jsonify)
from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy_utils import EmailType
from sqlalchemy import ForeignKey
from datetime import datetime
# from flask_jwt_extended import JWTManager
# from flask_jwt_extended import (create_access_token)

from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trippy.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    display_name = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.String(255), default="Hi, I'm new to Trippy!")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    Trip = db.relationship('Trip', backref='User', lazy=True)

    # def __repr__(self):
    #     return '<User %r>' % self.id
    
    def __init__(self, name):
        self.id = id,
        self.user_email = user_email,
        self.password = password, 
        self.display_name = display_name, 
        self.bio = bio,
        self.date_created = date_created

    def serialize(self):
        return {"id": self.id,
                "user_email": self.user_email,
                "password": self.password,
                "display_name":self.display_name,
                "bio": self.bio,
                "date_created": self.date_created}

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

# LOGIN ROUTE

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        user_email = request.form['user_email']
        password = request.form['password']
        error = None
        user = db.session.execute('SELECT * FROM user WHERE user_email = ?', (user_email,)).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user.id
            return redirect(url_for('users.welcome'))

        flash(error)

    return 'You are logged in'



#USER TABLE ROUTES

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        user_email = request.form['user_email']
        user_password = request.form['password']
        user_display_name = request.form['display_name']
        new_user = User(user_email = user_email, password = generate_password_hash(user_password), display_name = user_display_name)

        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding user'
    elif request.method == 'GET':
        return jsonify({'users': list(map(lambda user: user.serialize(), User.query.all()))})
        # return jsonify({'user': User.query.get_or_404(2).serialize()})

@app.route('/delete/<int:id>', methods=['DELETE', 'GET'])
def delete(id):
    user_to_delete = User.query.get_or_404(id)

    try:
        db.session.delete(user_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
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

@app.route('/update-account/<int:id>', methods=['GET', 'POST'])
def update_account(id):
    user_to_update = User.query.get_or_404(id)
    if request.method == 'POST':
        if request.form['user_email'] != '':
            user_to_update.user_email = request.form['user_email']
        if request.form['password'] != '':
            user_to_update.password = request.form['password']
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


#TRIP TABLE ROUTES

@app.route('/trip/<int:user_id>', methods=['POST', 'GET'])
def create_trip(user_id):
    if request.method == 'POST':
        trip_country = request.form['trip_country']
        trip_bio = request.form['trip_bio']
        trip_length = request.form['trip_length']
        new_trip = Trip(user_id = user_id, trip_country = trip_country, trip_bio = trip_bio, trip_length = trip_length)

        try:
            db.session.add(new_trip)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding trip'
    else:
        # tasks = Todo.query.order_by(Todo.date_created).all()
        return 'Post did not work'

@app.route('/trip/delete/<int:id>', methods=['DELETE', 'GET'])
def delete_trip(id):
    trip_to_delete = Trip.query.get_or_404(id)

    try:
        db.session.delete(trip_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'


@app.route('/trip/update/<int:id>', methods=['GET', 'POST'])
def update_trip(id):
    trip_to_update = Trip.query.get_or_404(id)
    if request.method == 'POST':
        #probably don't need these: 
        if request.form['trip_country'] != '':
            trip_to_update.trip_country = request.form['trip_country']
        # if request.form['trip_bio'] != '':
        #     trip_to_update.trip_bio = request.form['trip_bio']
        # if request.form['trip_length'] != '':
        #     trip_to_update.trip_length = request.form['trip_length']
        print(request.form)
        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating your task'
                
    else:
        return 'Could not update'

    try:
        db.session.put(trip_to_update)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem updating that task'

# @app.route('/update-account/<int:id>', methods=['GET', 'POST'])
# def update_account(id):
#     user_to_update = User.query.get_or_404(id)
#     if request.method == 'POST':
#         if request.form['email'] != '':
#             user_to_update.email = request.form['email']
#         if request.form['password'] != '':
#             user_to_update.password = request.form['password']
#         print(request.form)
#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your task'
                
#     else:
#         return 'Could not update'

#     try:
#         db.session.put(user_to_update)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem deleting that task'




if __name__ == "__main__":
    app.run(debug=True)
