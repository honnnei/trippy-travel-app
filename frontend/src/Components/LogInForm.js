import React, {  useState } from 'react';
//import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function LogInForm() { 
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
  
    const loginUser = () => {
      Axios.post('/login', {
        user_email: userEmail,
        password: userPassword
      }).then(response => console.log(response))
      .catch(error => {
        console.log("this is error", error.message);
      });
    console.log('logging in' + userEmail + userPassword)
    }

    console.log(userEmail, userPassword)
    return(
        <div className="login-form-container">
            <Form className="login-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onSubmit={loginUser}>
                    Login
                </Button>
            </Form>
        </div>
        )
    }