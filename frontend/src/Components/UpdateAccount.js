import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';


function UpdateAccount() {

  const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState('');
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
    Axios.put(`/user/settings`, {
      user_email: userEmail,
      password: userPassword,
      new_password: newUserPassword
    })
    .then( response => console.log(response) )
    .then( getUserData() )
    .catch(error => {
      console.log("Error:", error.message);
    });
  }

  useEffect(()=>{
    getUserData()
  }, [])

  useEffect(() => {
    setUserEmail(userData.user_email)
    setUserPassword(userData.password)
    }, [userData]);


    return (
      <div className="user-profile">
          <Form onSubmit={updateUserSettings}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="user_email"
                        placeholder="Enter email"
                        value={userEmail}
                        onChange = {(e) => setUserEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        
                        onChange = {(e) => setUserPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter new password</Form.Label>
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
                    Update Account
                </Button>
            </Form>
            <Button variant="primary" type="submit" onClick={getUserData}>
                    getUserData
                </Button>
      </div>
    );
}

export default UpdateAccount;