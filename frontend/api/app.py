from flask import Flask, jsonify, request, json, redirect, session
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_marshmallow import Marshmallow
import os
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'trippy.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma = Marshmallow(app)
#image folder 
# foldername ="C:\\Users\\Amita\\Desktop\\fyp\\trippy-travel-app\\frontend\\api\\uploads"
'C:\\Users\\hannp\\github\\Futureproof\\trippy-travel-app\\frontend\\api\\uploads\\'
#foldername = 'C:\Users\hannp\github\Futureproof/trippy-travel-app/frontend/api/uploads'
foldername = os.path.join(basedir, 'uploads')
app.config["IMAGE_UPLOADS"] = foldername
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG","JPG", "PNG", "GIF"]
app.config["MAX_IMAGE_FILESIZE"] = 50 * 1024 * 1024

CORS(app)

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

#REGISTER ROUTE

@app.route('/auth/register', methods=['POST'])
def register():
    db = sqlite3.connect('trippy.db')

    checkEmail = get_user_email()

    if checkEmail is True:
        return jsonify({"error_message":"There is already an account registered with that email."})

    user_email = request.get_json()['user_email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    display_name = request.get_json()['display_name']
    bio = "Hi, I've just joined Trippy!"
    date_created = datetime.utcnow()
    db.execute("INSERT INTO user (user_email, password, display_name, bio, date_created) VALUES (?, ?, ?, ?, ?)", (user_email, password, display_name, bio, date_created))

    db.commit()

    result = {
        'success_message' : 'Created account successfully',
	}

    return result

#LOGIN ROUTE

@app.route('/auth/login', methods=['POST'])
def login():
    db = sqlite3.connect('trippy.db')
    c = db.cursor()

    user_email = request.get_json()['user_email']
    password = request.get_json()['password']
    result = ""
	
    rv = db.execute("SELECT password FROM user where user_email = ?", (user_email,)).fetchone()[0]
	
    if bcrypt.check_password_hash(rv, password):
        id = db.execute("SELECT id FROM user where user_email = ?", (user_email,)).fetchone()[0]
        access_token = create_access_token(identity={'user_id': id})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password",})
    
    return result

#checks user email
def get_user_email():

    db = sqlite3.connect('trippy.db')
    print(request.get_json())
    user_email = request.get_json()['user_email']
    rv = db.execute("SELECT id FROM user where user_email = ?", (user_email,)).fetchone()
    print('THIS IS RV')
    print(rv)
    response = False
    if rv is not None:
        response = True

    return response

#ONLY KEEPING THIS CREATE_USER FOR POSTMAN:
@app.route('/user', methods=['POST'])
def create_user():
    user_email = request.json['user_email']
    password = request.json['password']
    display_name = request.json['display_name']
    
    new_user = User(user_email, generate_password_hash(password), display_name)
   
    db.session.add(new_user)
    db.session.commit()
    
    return user_schema.jsonify(new_user)
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



class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    trip_country = db.Column(db.String(200), nullable=False)
    trip_bio = db.Column(db.String(200), nullable=True)
    trip_length = db.Column(db.Integer)
    trip_image = db.Column(db.String(200), default='dino-reichmuth-A5rCN8626Ck-unsplash.jpg')
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id, trip_country, trip_bio, trip_length,trip_image):
        self.user_id = user_id
        self.trip_country = trip_country
        self.trip_bio = trip_bio
        self.trip_length = trip_length
        self.trip_image = trip_image
        

class TripSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id','user_email', 'trip_country', 'trip_bio', 'trip_length', 'trip_image','date_created')

#Init schema
trip_schema = TripSchema()
# strict=True
trips_schema = TripSchema(many=True)
# def allowed_image(filename):
    
#     # We only want files with a . in the filename
#     if not "." in filename:
#         return False

#     # Split the extension from the filename
#     ext = filename.rsplit(".", 1)[1]

#     # Check if the extension is in ALLOWED_IMAGE_EXTENSIONS
#     if ext.upper() in app.config["ALLOWED_IMAGE_EXTENSIONS"]:
#         return True
#     else:
#         return False


@app.route("/profile", methods=["POST"])
def create_trip():
    print(request, request.files, request.cookies)
    if request.files:
        files = request.files.getlist("image")
        images = []
        s = ', '
        for file in files:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
            images.append(filename)
        a = ','.join(images)
        trip_image = a
        print("Image saved")
        user_id = request.form['user_id']
        trip_country = request.form['trip_country']
        trip_bio = request.form['trip_bio']
        trip_length = request.form['trip_length']
        trip_image = filename
        new_trip = Trip(
            user_id=user_id, trip_country=trip_country, trip_bio=trip_bio, trip_length=trip_length, trip_image=a)
        try:
            db.session.add(new_trip)
            db.session.commit()
            # return trip_schema.jsonify(new_trip)
            return 'created trip'
        except:
            return 'Could not create a user'
    else:
        user_id = request.form['user_id']
        trip_country = request.form['trip_country']
        trip_bio = request.form['trip_bio']
        trip_length = request.form['trip_length']
        trip_image = 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg'
        new_trip = Trip(
            user_id=user_id, trip_country=trip_country, trip_bio=trip_bio, trip_length=trip_length, trip_image=trip_image)
        try:
            db.session.add(new_trip)
            db.session.commit()
            # return trip_schema.jsonify(new_trip)
            return 'created trip'
        except:
            return 'Could not create a user'
    return "could not upload image"

# @app.route("/trip", methods=["GET"])
# def display_image():
#     return "Image added"

#TRIP TABLE ROUTES

# @app.route('/trip/<int:user_id>', methods=['POST'])
# def create_trip(user_id):
#     trip_country = request.json['trip_country']
#     trip_bio = request.json['trip_bio']
#     trip_length = request.json['trip_length']
#     new_trip = Trip(user_id, trip_country, trip_bio, trip_length)

#     try:
#         db.session.add(new_trip)
#         db.session.commit()
#         return trip_schema.jsonify(new_trip)
#     except:
#         return 'There was an issue creating trip'

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
@app.route('/user/trip/<int:user_id>', methods=['GET'])
def get_trips_of_single_user(user_id):
    user_trips = Trip.query.filter(Trip.user_id == user_id).order_by(Trip.date_created).all()
    result = trips_schema.dump(user_trips)
    return jsonify(result)

# @app.route('/trip/<int:trip_id>', methods=['DELETE'])
# def delete_trip(trip_id):
#     trip = Trip.query.get(trip_id)
#     db.session.delete(trip)
#     db.session.commit()
#     return trip_schema.jsonify(trip)

# @app.route('/trip/<int:trip_id>', methods=['PUT'])
# def update_trip(trip_id):
#     trip = Trip.query.get(trip_id)
#     if request.json['trip_country'] != '':
#         trip.trip_country = request.json['trip_country']
#     if request.json['trip_bio'] != '':
#         trip.trip_bio = request.json['trip_bio']
#     if request.json['trip_length'] != 0:
#         trip.trip_length = request.json['trip_length']
#     try:
#         db.session.commit()
        
#         return trip_schema.jsonify(trip)
#     except:
#         return 'Could not update trip'


def calc(a, b):
    return a + b


# class Feed(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)

if __name__ == '__main__':
    app.run(debug=True)
    
