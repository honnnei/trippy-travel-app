import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';


function UpdateEmail() {

  const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);


  const getUserData = () => {
    console.log('get user request')
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
      console.log(response.data);
    });
  }

  const updateUserSettings = () => {
    console.log('update user settings')
    Axios.put(`/user/email`, {
      user_id: userId,
      user_email: userEmail,
      new_user_email: newUserEmail,
    })
    .then( response => console.log(response) )
    .then( window.location.href = "/profile")
    .catch(error => {
      console.log("Error:", error.message);
    });
  }

  useEffect(()=>{
    getUserData()
  }, [])

  useEffect(() => {
    setUserEmail(userData.user_email)
    }, [userData]);


    return (
      <div className="user-profile">
          <Form onSubmit={updateUserSettings}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Current Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="user_email"
                        placeholder="Enter email"
                        value={userEmail}
                        onChange = {(e) => setUserEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter New Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="new_user_email"
                        placeholder="Enter email"
                        onChange = {(e) => setNewUserEmail(e.target.value)}
                    />
                </Form.Group>
               

                <Button variant="primary" type="submit">
                    Update email
                </Button>
            </Form>
      </div>
    );
}

export default UpdateEmail;