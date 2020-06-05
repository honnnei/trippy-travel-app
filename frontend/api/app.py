from flask import Flask, request, redirect, session, jsonify, json
#render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import marshmallow_sqlalchemy
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
    # Trip = db.relationship('Trip', backref='User', lazy=True)

    # def __repr__(self):
    #     return '<User %r>' % self.id
    
    def __init__(self, user_email, password, display_name):
        self.user_email = user_email
        self.password = password 
        self.display_name = display_name

    # def serialize(self):
    #     return {"id": self.id,
    #             "user_email": self.user_email,
    #             "password": self.password,
    #             "display_name":self.display_name,
    #             "bio": self.bio,
    #             "date_created": self.date_created}
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_email', 'password', 'display_name', 'bio', 'date_created')

#Init schema
user_schema = UserSchema()
# strict=True
users_schema = UserSchema(many=True)

#USER TABLE ROUTES

@app.route('/', methods=['POST'])
def create_user():
    user_email = request.json['user_email']
    password = request.json['password']
    display_name = request.json['display_name']
    
    new_user = User(user_email, password, display_name)
   
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


# elif request.method == 'GET':
#     return jsonify({'users': list(map(lambda user: user.serialize(), User.query.all()))})
    # return jsonify({'user': User.query.get_or_404(2).serialize()})

# @app.route('/', methods=['POST', 'GET'])
# def create_user():
#     if request.method == 'POST':
#         user_email = request.form['user_email']
#         user_password = request.form['password']
#         user_display_name = request.form['display_name']
#         new_user = User(user_email = user_email, password = user_password, display_name = user_display_name)

#         try:
#             db.session.add(new_user)
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue adding user'
#     elif request.method == 'GET':
#         return jsonify({'users': list(map(lambda user: user.serialize(), User.query.all()))})
#         # return jsonify({'user': User.query.get_or_404(2).serialize()})


# @app.route('/delete/<int:id>', methods=['DELETE', 'GET'])
# def delete(id):
#     user_to_delete = User.query.get_or_404(id)

#     try:
#         db.session.delete(user_to_delete)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem deleting that task'

# @app.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
# def update(id):
#     user_to_update = User.query.get_or_404(id)
#     if request.method == 'POST':
#         if request.form['bio'] != '':
#             user_to_update.bio = request.form['bio']
#         if request.form['display_name'] != '':
#             user_to_update.display_name = request.form['display_name']
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






# class Trip(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, ForeignKey('user.id'))
#     trip_country = db.Column(db.String(200), nullable=False)
#     trip_bio = db.Column(db.String(200), nullable=True)
#     trip_length = db.Column(db.Integer)
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)

#     def __repr__(self):
#         return '<Trip %r>' % self.id

# class Feed(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)

#     def __repr__(self):
#         return '<Feed %r>' % self.id

# #LOGIN ROUTE

# # @app.route('/login', methods=['POST', 'GET'])
# # def login():
# #     if request.method == "POST":
# #         user_email = request.get_json()['user_email']
# #         password = request.get_json()['password']
        
# #         if user:
# #             session['user_id'] = user.id
# #             return redirect(url_for('users.welcome'))
# #     return 'You are logged in'






# #TRIP TABLE ROUTES

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

# # @app.route('/update-account/<int:id>', methods=['GET', 'POST'])
# # def update_account(id):
# #     user_to_update = User.query.get_or_404(id)
# #     if request.method == 'POST':
# #         if request.form['email'] != '':
# #             user_to_update.email = request.form['email']
# #         if request.form['password'] != '':
# #             user_to_update.password = request.form['password']
# #         print(request.form)
# #         try:
# #             db.session.commit()
# #             return redirect('/')
# #         except:
# #             return 'There was an issue updating your task'
                
# #     else:
# #         return 'Could not update'

# #     try:
# #         db.session.put(user_to_update)
# #         db.session.commit()
# #         return redirect('/')
# #     except:
# #         return 'There was a problem deleting that task'



#Run Server
if __name__ == "__main__":
    app.run(debug=True)
