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
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'trippy.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma = Marshmallow(app)

foldername = 'C:\\Users\\hannp\\github\\Futureproof\\trippy-travel-app\\frontend\\src\\images'
app.config["IMAGE_UPLOADS"] = foldername
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG", "JPG", "PNG", "GIF"]
app.config["MAX_IMAGE_FILESIZE"] = 50 * 1024 * 1024

CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    display_name = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.String(255), default="Hi, I'm new to Trippy!")
    profile_picture = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    Trip = db.relationship('Trip', backref='User', lazy=True)

    def __init__(self, user_email, password, display_name):
        self.user_email = user_email
        self.password = password
        self.display_name = display_name


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_email', 'password',
                  'display_name', 'bio', 'profile_picture', 'date_created')


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
        return jsonify({"error_message": "There is already an account registered with that email."})

    user_email = request.get_json()['user_email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')
    display_name = request.get_json()['display_name']
    bio = "Hi, I've just joined Trippy!"
    profile_picture = "default_profile_picture.jpg"
    date_created = datetime.utcnow()
    db.execute("INSERT INTO user (user_email, password, display_name, bio, profile_picture, date_created) VALUES (?, ?, ?, ?, ?, ?)",
                (user_email, password, display_name, bio, profile_picture, date_created))

    db.commit()

    result = {
        'success_message': 'Created account successfully',
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

    rv = db.execute("SELECT password FROM user where user_email = ?",
                    (user_email,)).fetchone()[0]

    if bcrypt.check_password_hash(rv, password):
        id = db.execute("SELECT id FROM user where user_email = ?",
                        (user_email,)).fetchone()[0]
        access_token = create_access_token(identity={'user_id': id})
        result = access_token
    else:
        result = jsonify({"error": "Invalid username and password", })

    return result

#checks user email

def get_user_email():

    db = sqlite3.connect('trippy.db')
    print(request.get_json())
    user_email = request.get_json()['user_email']
    rv = db.execute("SELECT id FROM user where user_email = ?",
                    (user_email,)).fetchone()
    print('THIS IS RV')
    print(rv)
    response = False
    if rv is not None:
        response = True

    return response

#USER TABLE ROUTES

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
    if request.files:
        files = request.files.getlist("file")
        images = []
        for file in files:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
            images.append(filename)
        profile_picture_image = ','.join(images)
        user.profile_picture = profile_picture_image
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
    trip_country_code = db.Column(db.String(200), nullable=False)
    trip_country = db.Column(db.String(200),)
    trip_bio = db.Column(db.String(200), nullable=True)
    trip_length = db.Column(db.Integer)
    trip_image = db.Column(
        db.String(200), default='dino-reichmuth-A5rCN8626Ck-unsplash.jpg')
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id, trip_country_code, trip_country, trip_bio, trip_length, trip_image):
        self.user_id = user_id
        self.trip_country_code = trip_country_code
        self.trip_country = trip_country
        self.trip_bio = trip_bio
        self.trip_length = trip_length
        self.trip_image = trip_image


class TripSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'user_email', 'trip_country_code', 'trip_country', 'trip_bio', 'trip_length', 'trip_image', 'date_created')

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


@app.route("/trip/<int:user_id>", methods=["POST"])
def create_trip(user_id):
    print('post request')
    ISO3166 = {
	'AD': 'Andorra',
	'AE': 'United Arab Emirates',
	'AF': 'Afghanistan',
	'AG': 'Antigua & Barbuda',
	'AI': 'Anguilla',
	'AL': 'Albania',
	'AM': 'Armenia',
	'AN': 'Netherlands Antilles',
	'AO': 'Angola',
	'AQ': 'Antarctica',
	'AR': 'Argentina',
	'AS': 'American Samoa',
	'AT': 'Austria',
	'AU': 'Australia',
	'AW': 'Aruba',
	'AZ': 'Azerbaijan',
	'BA': 'Bosnia and Herzegovina',
	'BB': 'Barbados',
	'BD': 'Bangladesh',
	'BE': 'Belgium',
	'BF': 'Burkina Faso',
	'BG': 'Bulgaria',
	'BH': 'Bahrain',
	'BI': 'Burundi',
	'BJ': 'Benin',
	'BM': 'Bermuda',
	'BN': 'Brunei Darussalam',
	'BO': 'Bolivia',
	'BR': 'Brazil',
	'BS': 'Bahama',
	'BT': 'Bhutan',
	'BU': 'Burma (no longer exists)',
	'BV': 'Bouvet Island',
	'BW': 'Botswana',
	'BY': 'Belarus',
	'BZ': 'Belize',
	'CA': 'Canada',
	'CC': 'Cocos (Keeling) Islands',
	'CF': 'Central African Republic',
	'CG': 'Congo',
	'CH': 'Switzerland',
	'CI': 'Côte D\'ivoire (Ivory Coast)',
	'CK': 'Cook Iislands',
	'CL': 'Chile',
	'CM': 'Cameroon',
	'CN': 'China',
	'CO': 'Colombia',
	'CR': 'Costa Rica',
	'CS': 'Czechoslovakia (no longer exists)',
	'CU': 'Cuba',
	'CV': 'Cape Verde',
	'CX': 'Christmas Island',
	'CY': 'Cyprus',
	'CZ': 'Czech Republic',
	'DD': 'German Democratic Republic (no longer exists)',
	'DE': 'Germany',
	'DJ': 'Djibouti',
	'DK': 'Denmark',
	'DM': 'Dominica',
	'DO': 'Dominican Republic',
	'DZ': 'Algeria',
	'EC': 'Ecuador',
	'EE': 'Estonia',
	'EG': 'Egypt',
	'EH': 'Western Sahara',
	'ER': 'Eritrea',
	'ES': 'Spain',
	'ET': 'Ethiopia',
	'FI': 'Finland',
	'FJ': 'Fiji',
	'FK': 'Falkland Islands (Malvinas)',
	'FM': 'Micronesia',
	'FO': 'Faroe Islands',
	'FR': 'France',
	'FX': 'France, Metropolitan',
	'GA': 'Gabon',
	'GB': 'United Kingdom (Great Britain)',
	'GD': 'Grenada',
	'GE': 'Georgia',
	'GF': 'French Guiana',
	'GH': 'Ghana',
	'GI': 'Gibraltar',
	'GL': 'Greenland',
	'GM': 'Gambia',
	'GN': 'Guinea',
	'GP': 'Guadeloupe',
	'GQ': 'Equatorial Guinea',
	'GR': 'Greece',
	'GS': 'South Georgia and the South Sandwich Islands',
	'GT': 'Guatemala',
	'GU': 'Guam',
	'GW': 'Guinea-Bissau',
	'GY': 'Guyana',
	'HK': 'Hong Kong',
	'HM': 'Heard & McDonald Islands',
	'HN': 'Honduras',
	'HR': 'Croatia',
	'HT': 'Haiti',
	'HU': 'Hungary',
	'ID': 'Indonesia',
	'IE': 'Ireland',
	'IL': 'Israel',
	'IN': 'India',
	'IO': 'British Indian Ocean Territory',
	'IQ': 'Iraq',
	'IR': 'Islamic Republic of Iran',
	'IS': 'Iceland',
	'IT': 'Italy',
	'JM': 'Jamaica',
	'JO': 'Jordan',
	'JP': 'Japan',
	'KE': 'Kenya',
	'KG': 'Kyrgyzstan',
	'KH': 'Cambodia',
	'KI': 'Kiribati',
	'KM': 'Comoros',
	'KN': 'St. Kitts and Nevis',
	'KP': 'Korea, Democratic People\'s Republic of',
	'KR': 'Korea, Republic of',
	'KW': 'Kuwait',
	'KY': 'Cayman Islands',
	'KZ': 'Kazakhstan',
	'LA': 'Lao People\'s Democratic Republic',
	'LB': 'Lebanon',
	'LC': 'Saint Lucia',
	'LI': 'Liechtenstein',
	'LK': 'Sri Lanka',
	'LR': 'Liberia',
	'LS': 'Lesotho',
	'LT': 'Lithuania',
	'LU': 'Luxembourg',
	'LV': 'Latvia',
	'LY': 'Libyan Arab Jamahiriya',
	'MA': 'Morocco',
	'MC': 'Monaco',
	'MD': 'Moldova, Republic of',
	'MG': 'Madagascar',
	'MH': 'Marshall Islands',
	'ML': 'Mali',
	'MN': 'Mongolia',
	'MM': 'Myanmar',
	'MO': 'Macau',
	'MP': 'Northern Mariana Islands',
	'MQ': 'Martinique',
	'MR': 'Mauritania',
	'MS': 'Monserrat',
	'MT': 'Malta',
	'MU': 'Mauritius',
	'MV': 'Maldives',
	'MW': 'Malawi',
	'MX': 'Mexico',
	'MY': 'Malaysia',
	'MZ': 'Mozambique',
	'NA': 'Namibia',
	'NC': 'New Caledonia',
	'NE': 'Niger',
	'NF': 'Norfolk Island',
	'NG': 'Nigeria',
	'NI': 'Nicaragua',
	'NL': 'Netherlands',
	'NO': 'Norway',
	'NP': 'Nepal',
	'NR': 'Nauru',
	'NT': 'Neutral Zone (no longer exists)',
	'NU': 'Niue',
	'NZ': 'New Zealand',
	'OM': 'Oman',
	'PA': 'Panama',
	'PE': 'Peru',
	'PF': 'French Polynesia',
	'PG': 'Papua New Guinea',
	'PH': 'Philippines',
	'PK': 'Pakistan',
	'PL': 'Poland',
	'PM': 'St. Pierre & Miquelon',
	'PN': 'Pitcairn',
	'PR': 'Puerto Rico',
	'PT': 'Portugal',
	'PW': 'Palau',
	'PY': 'Paraguay',
	'QA': 'Qatar',
	'RE': 'Réunion',
	'RO': 'Romania',
	'RU': 'Russian Federation',
	'RW': 'Rwanda',
	'SA': 'Saudi Arabia',
	'SB': 'Solomon Islands',
	'SC': 'Seychelles',
	'SD': 'Sudan',
	'SE': 'Sweden',
	'SG': 'Singapore',
	'SH': 'St. Helena',
	'SI': 'Slovenia',
	'SJ': 'Svalbard & Jan Mayen Islands',
	'SK': 'Slovakia',
	'SL': 'Sierra Leone',
	'SM': 'San Marino',
	'SN': 'Senegal',
	'SO': 'Somalia',
	'SR': 'Suriname',
	'ST': 'Sao Tome & Principe',
	'SU': 'Union of Soviet Socialist Republics (no longer exists)',
	'SV': 'El Salvador',
	'SY': 'Syrian Arab Republic',
	'SZ': 'Swaziland',
	'TC': 'Turks & Caicos Islands',
	'TD': 'Chad',
	'TF': 'French Southern Territories',
	'TG': 'Togo',
	'TH': 'Thailand',
	'TJ': 'Tajikistan',
	'TK': 'Tokelau',
	'TM': 'Turkmenistan',
	'TN': 'Tunisia',
	'TO': 'Tonga',
	'TP': 'East Timor',
	'TR': 'Turkey',
	'TT': 'Trinidad & Tobago',
	'TV': 'Tuvalu',
	'TW': 'Taiwan, Province of China',
	'TZ': 'Tanzania, United Republic of',
	'UA': 'Ukraine',
	'UG': 'Uganda',
	'UM': 'United States Minor Outlying Islands',
	'US': 'United States of America',
	'UY': 'Uruguay',
	'UZ': 'Uzbekistan',
	'VA': 'Vatican City State (Holy See)',
	'VC': 'St. Vincent & the Grenadines',
	'VE': 'Venezuela',
	'VG': 'British Virgin Islands',
	'VI': 'United States Virgin Islands',
	'VN': 'Viet Nam',
	'VU': 'Vanuatu',
	'WF': 'Wallis & Futuna Islands',
	'WS': 'Samoa',
	'YD': 'Democratic Yemen (no longer exists)',
	'YE': 'Yemen',
	'YT': 'Mayotte',
	'YU': 'Yugoslavia',
	'ZA': 'South Africa',
	'ZM': 'Zambia',
	'ZR': 'Zaire',
	'ZW': 'Zimbabwe',
	'ZZ': 'Unknown or unspecified country',
}
    print(request, request.files, request.cookies)
    if request.files:
        print('in request files')
        files = request.files.getlist("file")
        images = []
        for file in files:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
            images.append(filename)
        trip_image = ','.join(images)
        trip_country_code = request.form['trip_country_code']
        trip_country = ISO3166[trip_country_code]
        # trip_country = 'Spain'
        trip_bio = request.form['trip_bio']
        trip_length = request.form['trip_length']
        print(user_id, trip_country_code, trip_country, trip_bio, trip_length, trip_image)
        new_trip = Trip(user_id, trip_country_code, trip_country, trip_bio, trip_length, trip_image)
        try:
            db.session.add(new_trip)
            db.session.commit()
            return trip_schema.jsonify(new_trip)
        # return 'created trip'
        except:
            return 'Could not create a user'
    # else:
        # user_id = request.form['user_id']
        # trip_country_code = request.form['trip_country_code']
        # trip_bio = request.form['trip_bio']
        # trip_length = request.form['trip_length']
        # trip_country = ISO3166[trip_country_code]
        # print(trip_country)
        # # trip_image = 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg'
        # new_trip = Trip(
        #     user_id=user_id, trip_country_code=trip_country_code, trip_country=trip_country, trip_bio=trip_bio, trip_length=trip_length)
    #     try:
    #         db.session.add(new_trip)
    #         db.session.commit()
    #         # return trip_schema.jsonify(new_trip)
    #         return 'created trip'
    #     except:
    #         return 'Could not create a user'
    # return "could not upload image"
            # return 'Could not create a trip'
    else:
        print('didnt work')
        return 'meh'

# @app.route('/trip', methods=['POST'])
# def create_trip():
#     db = sqlite3.connect('trippy.db')
#     if request.files:
#         files = request.files.getlist("image")
#         images = []
#         s = ', '
#         for file in files:
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
#             images.append(filename)
#         a = ','.join(images)
#         trip_image = a
#         print("Image saved")
#         user_id = request.form['userId']
#         trip_country = request.form['trip_country']
#         trip_bio = request.form['trip_bio']
#         trip_length = request.form['trip_length']
#         trip_image = filename
        

#     user_email = request.get_json()['user_email']
#     password = bcrypt.generate_password_hash(
#         request.get_json()['password']).decode('utf-8')
#     display_name = request.get_json()['display_name']
#     bio = "Hi, I've just joined Trippy!"
#     date_created = datetime.utcnow()
#     db.execute("INSERT INTO user (user_email, password, display_name, bio, date_created) VALUES (?, ?, ?, ?, ?)",
#                (user_email, password, display_name, bio, date_created))

#     db.commit()

#     result = {
#         'success_message': 'Created account successfully',
#     }

#     return result




# @app.route("/trip", methods=["GET"])
# def display_image():
#     return "Image added"

#TRIP TABLE ROUTES

@app.route('/craetetrip/<int:user_id>', methods=['POST'])
def create_trip_two(user_id):
    trip_country = request.json['trip_country']
    trip_bio = request.json['trip_bio']
    trip_length = request.json['trip_length']
    trip_image = 'hey'
    new_trip = Trip(user_id, trip_country, trip_bio, trip_length, trip_image)

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
    user_trips = Trip.query.filter(
        Trip.user_id == user_id).order_by(Trip.date_created).all()
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


def calc(a, b):
    return a + b


# class Feed(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     trip_id = db.Column(db.Integer, ForeignKey('trip.id'))
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)


#Run Server
if __name__ == "__main__":
    app.run(debug=True)
