# import coverage
# COV = coverage.coverage(branch=True, include='app*')
# COV.start()

import json
import unittest
# from run 
import app

class TestTrippyApp(unittest.TestCase):

    def setup(self):
        self.app = app
        self.client = self.app.test_client()
        self.data = {
            "user_email": "gg@gmail.com",
            "password": "thispassword",
            "display_name": "hassan"
        }

    def test_creating_user(self):
        response = self.client.port(path='/user', data=json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()