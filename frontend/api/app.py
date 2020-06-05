from flask import Flask, jsonify, request, json
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_marshmallow import Marshmallow
import marshmallow_sqlalchemy
import os
import sqlite3

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'trippy.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma = Marshmallow(app)

CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    display_name = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.String(255), default="Hi, I'm new to Trippy!")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

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

#register route

@app.route('/auth/register', methods=['POST'])
def register():
    db = sqlite3.connect('trippy.db')

    user_email = request.get_json()['user_email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    display_name = request.get_json()['display_name']
    db.execute("INSERT INTO user (user_email, password, display_name) VALUES (?, ?, ?)", (user_email, password, display_name))

    db.commit()

    result = {
		'user_email' : user_email,
		'display_name' : display_name,
		'password' : password,
	}

    return jsonify({'result' : result})

#login route

@app.route('/auth/login', methods=['POST'])
def login():
    db = sqlite3.connect('trippy.db')
    c = db.cursor()

    user_email = request.get_json()['user_email']
    password = request.get_json()['password']
    result = ""
	
    rv = db.execute("SELECT password FROM user where user_email = ?", (user_email,)).fetchone()[0]
    print(rv)
    # rv = c.execute("SELECT * FROM user where user_email = 'banana@test.com'")
    # rv = c.fetchone()[0]
	
    if bcrypt.check_password_hash(rv, password):
        access_token = create_access_token(identity={'user_email': user_email})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

#USER TABLE ROUTES

@app.route('/', methods=['POST'])
def create_user():
    user_email = request.json['user_email']
    password = request.json['password']
    display_name = request.json['display_name']
    
    new_user = User(user_email, generate_password_hash(password), display_name)
   
    db.session.add(new_user)
    db.session.commit()
    
    return user_schema.jsonify(new_user)

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
@app.route('/user/<int:id>', methods=['PUT'])
def update_user_profile(id):
    user = User.query.get(id)
    if request.json['bio'] != '':
        user.bio = request.json['bio']
    if request.json['display_name'] != '':
        user.display_name = request.json['display_name']
    
    db.session.commit()
    
    return user_schema.jsonify(user)

#delete user
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)