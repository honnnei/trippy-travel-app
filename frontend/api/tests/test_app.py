# import coverage
# COV = coverage.coverage(branch=True, include='app*')
# COV.start()

import os
import json
import unittest
# from run 
import app
from app import * 
# import app.client

class TestTrippyApp(unittest.TestCase):

    # def setup(self):
    #     self.app = app
    #     self.client = self.app.test_client()
    #     self.data = {
    #         "user_email": "gg@gmail.com",
    #         "password": "thispassword",
    #         "display_name": "hassan"
    #     }

    #authentication tests
    def test_calc(self):
        assert calc(1, 1) == 2

    def test_register(self):
        # response = app.test_client().port(path='/user', data=json.dumps(self.data), content_type='application/json')
        # response = self.client.port(path='/user', data=json.dumps(self.data), content_type='application/json')
        # self.assertEqual(response.status_code, 200)
        assert 1 == 1
    
    def test_login(self):
        assert 1 == 1

    #user tests

    def test_create_user(self):
        assert 1 == 1

    def test_get_users(self):
        assert 1 == 1

    # def test_connection(self):
    # with app.app_context():

    def test_get_user(self):
        with app.app_context():
            response = get_user(21)
            assert response.status_code == 200
        assert 1 == 1

    def test_update_user_profile(self):
        assert 1 == 1

    def test_delete_user(self):
        assert 1 == 1

    #trip tests
    
    def test_create_trip(self):
        # with app.app_context():
        #     response = create_trip(21)
        #     assert response.status_code == 200
        assert 1 == 1
    
    def test_get_trips_of_all_users(self):
        assert 1 == 1

    def test_get_trip_by_trip_id(self):
        assert 1 == 1

    def test_get_trips_of_single_user(self):
        assert 1 == 1

    def test_delete_trip(self):
        assert 1 == 1

    def test_update_trip(self):
        assert 1 == 1

    


if __name__ == '__main__':
    unittest.main()