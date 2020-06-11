import os, sys
import json
import unittest
from datetime import datetime
from flask_testing import TestCase
import app
from app import *
from flask_bcrypt import Bcrypt
from werkzeug.security import check_password_hash, generate_password_hash

TEST_DB = 'test.db'
basedir = os.path.abspath(os.path.dirname(__file__))
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class TestTrippyApp(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
            os.path.join(basedir, 'test.db')
        return app

    def setUp(self):
        db.create_all()
        person1 = User("test@test.com", "test", "testman")
        person2 = User("test1@test.com", "test1", "testman1")
        trip1 = Trip(1, "AU", "Australia", "What a great time down under!", 3, "image.jpg")
        db.session.add_all([person1, person2, trip1])
        db.session.commit()

    # executed after each test
    def tearDown(self):
        db.drop_all()

    # User Tests

    def test_create_user(self):
        response = self.client.post('/user', 
            data=json.dumps(dict(
                user_email='testing@testing.com',
                password='test123',
                display_name='tester man2',
                )),
                content_type='application/json'
            )
        data = json.loads(response.data)['display_name']
        self.assertEqual(response.status_code, 200)
        self.assertIn(data, 'tester man2')

    def test_create_trip(self):
        response = self.client.post('/trip/1', 
            data=dict(
                trip_country_code='ES',
                trip_bio='',
                trip_length=''
                ),
                content_type='multipart/form-data'
            )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Unable to add trip', response.data)

    def test_update_user_trip(self):
        self.client.put('/trip/1',
            data=json.dumps(dict(
                trip_bio="Nice",
                trip_country="Albania",
                trip_length=2
                )),
                content_type='application/json'
            )

        response = self.client.get(
            '/trip/1',
            follow_redirects=True
        )
        data = json.loads(response.data)['trip_country']
        self.assertIn("Albania", data)

    def test_user_delete(self):
        self.client.delete(
            '/user/1',
            follow_redirects=True
        )
        response = self.client.get(
            '/user/1', 
            follow_redirects=True
        )
        self.assertNotIn(b'testman', response.data)
        
    def test_get_user(self):
        response = self.client.get('/user/1', content_type='html/text')
        data = json.loads(response.data)['display_name']
        self.assertEqual(data, 'testman')
        self.assertEqual(response.status_code, 200)
        
    def test_get_users(self):
        response = self.client.get('/user', content_type='html/text')
        data = json.loads(response.data)
        self.assertIn(b'testman', response.data)
        
    def test_update_user_profile(self):
        response = self.client.put('/user/1', data=dict(display_name='tester update man', bio='updated bio', images=''), content_type="multipart/form-data")
        data = json.loads(response.data)['display_name']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, 'tester update man')

    # Trip Tests

    def test_get_all_trips(self):
        response = self.client.get('/trip/user', content_type='html/text')
        self.assertIn(b'Australia', response.data)
        self.assertEqual(response.status_code, 200)

    def test_get_trip_by_id(self):
        response = self.client.get('/trip/1', content_type='html/text')
        self.assertIn(b'Australia', response.data)
        self.assertEqual(response.status_code, 200)

    def test_get_all_user_trips(self):
        response = self.client.get('/user/trip/1', content_type='html/text')
        self.assertIn(b'Australia', response.data)
        self.assertEqual(response.status_code, 200)

    def test_trip_delete(self):
        self.client.delete(
            '/trip/1',
            follow_redirects=True
        )
        response = self.client.get(
            '/user/1', 
            follow_redirects=True
        )
        self.assertNotIn(b'Australia', response.data)


if __name__ == '__main__':
    unittest.main()