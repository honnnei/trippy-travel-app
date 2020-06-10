import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';


function UpdatePassword() {

  const [userData, setUserData] = useState({});
  const [userPassword, setUserPassword] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPasswordAgain, setNewUserPasswordAgain] = useState("");
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
    Axios.put(`/user/password`, {
      user_id: userId,
      password: userPassword,
      new_password: newUserPassword
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
    setUserPassword(userData.password)
    }, [userData]);


    return (
      <div className="user-profile">
          <Form onSubmit={updateUserSettings}>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter Current Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        
                        onChange = {(e) => setUserPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="New password" 
                        onChange = {(e) => setNewUserPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="re-password"
                        placeholder="Confirm new password"
                        onChange = {(e) => setNewUserPasswordAgain(e.target.value)}
                    />
                </Form.Group>
               

                <Button variant="primary" type="submit">
                    Update password
                </Button>
            </Form>
      </div>
    );
}

export default UpdatePassword;