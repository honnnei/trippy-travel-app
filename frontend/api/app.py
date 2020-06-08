from flask import Flask, request, redirect, session, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from sqlalchemy import ForeignKey
from datetime import datetime
# from sqlalchemy_utils import EmailType
# from flask_jwt_extended import JWTManager
# from flask_jwt_extended import (create_access_token)

from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

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
#image folder 
foldername ="C:\\Users\\Amita\\Desktop\\fyp\\trippy-travel-app\\frontend\\api\\uploads"
app.config["IMAGE_UPLOADS"] = foldername
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG","JPG", "PNG", "GIF"]
app.config["MAX_IMAGE_FILESIZE"] = 50 * 1024 * 1024
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

# @app.route('/trip/<int:user_id>', methods=['POST', 'GET'])
# def create_trip(user_id):
#     if request.method == 'POST':
#         trip_country = request.form['trip_country']
#         trip_bio = request.form['trip_bio']
#         trip_length = request.form['trip_length']
#         new_trip = Trip(user_id = user_id, trip_country = trip_country, trip_bio = trip_bio, trip_length = trip_length)

#         try:
#             db.session.add(new_trip)
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue adding trip'
#     else:
#         # tasks = Todo.query.order_by(Todo.date_created).all()
#         return 'Post did not work'

# @app.route('/trip/delete/<int:id>', methods=['DELETE', 'GET'])
# def delete_trip(id):
#     trip_to_delete = Trip.query.get_or_404(id)

#     try:
#         db.session.delete(trip_to_delete)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem deleting that task'


# @app.route('/trip/update/<int:id>', methods=['GET', 'POST'])
# def update_trip(id):
#     trip_to_update = Trip.query.get_or_404(id)
#     if request.method == 'POST':
#         #probably don't need these: 
#         if request.form['trip_country'] != '':
#             trip_to_update.trip_country = request.form['trip_country']
#         # if request.form['trip_bio'] != '':
#         #     trip_to_update.trip_bio = request.form['trip_bio']
#         # if request.form['trip_length'] != '':
#         #     trip_to_update.trip_length = request.form['trip_length']
#         print(request.form)
#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your task'
                
#     else:
#         return 'Could not update'

#     try:
#         db.session.put(trip_to_update)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem updating that task'

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
    trip_image = db.Column(db.String(200), nullable=True)
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

@app.route("/image", methods=["POST"])
def upload_image():
    print(request, request.files, request.cookies)
    if request.files:
        image = request.files["image"]
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
        print("Image saved")
        trip_country = request.form['trip_country']
        trip_bio = request.form['trip_bio']
        trip_length = request.form['trip_length']
        trip_image = filename
        new_trip = Trip(
               user_id=1, trip_country=trip_country, trip_bio=trip_bio, trip_length=trip_length, trip_image=filename)
        try:
            db.session.add(new_trip)
            db.session.commit()
            return trip_schema.jsonify(new_trip)
        except:
            return 'Could not create a user'
        return redirect(request.url)
    else:
        print("That file extension is not allowed")
        return redirect(request.url)
    return "could not upload image"


@app.route("/image", methods=["GET"])
def display_image():
    return "Image added"

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
    
