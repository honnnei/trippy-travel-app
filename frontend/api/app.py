from flask import Flask, request, redirect, session, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from sqlalchemy import ForeignKey
from datetime import datetime
# from sqlalchemy_utils import EmailType
# from flask_jwt_extended import JWTManager
# from flask_jwt_extended import (create_access_token)

#Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trippy.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'trippy.db')
# stops it from complaining in the terminal:
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init marshmallow
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    display_name = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.String(255), default="Hi, I'm new to Trippy!")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    Trip = db.relationship('Trip', backref='User', lazy=True)
    
    def __init__(self, user_email, password, display_name):
        self.user_email = user_email
        self.password = password 
        self.display_name = display_name

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_email', 'password', 'display_name', 'bio', 'date_created')

#Init schema
user_schema = UserSchema()
# strict=True
users_schema = UserSchema(many=True)

#USER TABLE ROUTES

@app.route('/user', methods=['POST'])
def create_user():
    user_email = request.json['email']
    password = request.json['password']
    display_name = request.json['display_name']
    
    new_user = User(user_email, password, display_name)
    try:
        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user)
    except:
        return 'Could not create a user'


#get all users
@app.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

#get single user
@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

#update a user (either bio or display_name!)
# you have send both BIO and DISPLAY_NAME values, otherwise, you'll get an error, but the value you're not updating can be an empty string
@app.route('/user/<int:id>', methods=['PUT'])
def update_user_profile(id):
    user = User.query.get(id)
    if request.json['bio'] != '':
        user.bio = request.json['bio']
    if request.json['display_name'] != '':
        user.display_name = request.json['display_name']
    try:
        db.session.commit()
        
        return user_schema.jsonify(user)
    except:
        return 'Could not update user'

#delete user
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

# LOGIN ROUTE & changing password:

# @app.route('/login', methods=['POST', 'GET'])
# def login():
#     if request.method == "POST":
#         user_email = request.get_json()['user_email']
#         password = request.get_json()['password']
        
#         if user:
#             session['user_id'] = user.id
#             return redirect(url_for('users.welcome'))
#     return 'You are logged in'

# @app.route('/update-account/<int:id>', methods=['GET', 'POST'])
# def update_account(id):
#     user_to_update = User.query.get_or_404(id)
#     if request.method == 'POST':
#         if request.form['user_email'] != '':
#             user_to_update.user_email = request.form['user_email']
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






class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    trip_country = db.Column(db.String(200), nullable=False)
    trip_bio = db.Column(db.String(200), nullable=True)
    trip_length = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id, trip_country, trip_bio, trip_length):
        self.user_id = user_id
        self.trip_country = trip_country
        self.trip_bio = trip_bio
        self.trip_length = trip_length

class TripSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id','user_email', 'trip_country', 'trip_bio', 'trip_length', 'date_created')

#Init schema
trip_schema = TripSchema()
# strict=True
trips_schema = TripSchema(many=True)


# #TRIP TABLE ROUTES

@app.route('/trip/<int:user_id>', methods=['POST'])
def create_trip(user_id):
    trip_country = request.json['trip_country']
    trip_bio = request.json['trip_bio']
    trip_length = request.json['trip_length']
    new_trip = Trip(user_id, trip_country, trip_bio, trip_length)

    try:
        db.session.add(new_trip)
        db.session.commit()
        return trip_schema.jsonify(new_trip)
    except:
        return 'There was an issue creating trip'

@app.route('/trip/user', methods=['GET'])
def get_trips_of_all_users():
    all_trips = Trip.query.all()
    result = trips_schema.dump(all_trips)
    return jsonify(result)

#get single trip by id
@app.route('/trip/<int:trip_id>', methods=['GET'])
def get_trip_by_trip_id(trip_id):
    trip = Trip.query.get(trip_id)
    return trip_schema.jsonify(trip)

#get all trips of a user:
@app.route('/trip/user/<int:user_id>', methods=['GET'])
def get_trips_of_single_user(user_id):
    user_trips = Trip.query.filter(Trip.user_id == user_id).order_by(Trip.date_created).all()
    result = trips_schema.dump(user_trips)
    return jsonify(result)

@app.route('/trip/<int:trip_id>', methods=['DELETE'])
def delete_trip(trip_id):
    trip = Trip.query.get(trip_id)
    db.session.delete(trip)
    db.session.commit()
    return trip_schema.jsonify(trip)

@app.route('/trip/<int:trip_id>', methods=['PUT'])
def update_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if request.json['trip_country'] != '':
        trip.trip_country = request.json['trip_country']
    if request.json['trip_bio'] != '':
        trip.trip_bio = request.json['trip_bio']
    if request.json['trip_length'] != 0:
        trip.trip_length = request.json['trip_length']
    try:
        db.session.commit()
        
        return trip_schema.jsonify(trip)
    except:
        return 'Could not update trip'


# class Feed(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)

#Run Server
if __name__ == "__main__":
    app.run(debug=True)
    
