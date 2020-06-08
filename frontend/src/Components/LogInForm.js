import React, {  useState } from 'react';
//import { Redirect } from "react-router-dom";
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router"
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode'


export default function LogInForm() { 
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    let history = useHistory()
  
  
    const loginUser = (e) => {
        e.preventDefault()
        Axios.post('/auth/login', {
            user_email: userEmail,
            password: userPassword
      })
      .then(response => {
          localStorage.setItem('usertoken', response.data);
          console.log(localStorage.usertoken);
          const token = localStorage.usertoken;
          const decoded = jwt_decode(token);
          console.log(decoded);
          history.push("/user");
          return response.data
      })
      .catch(error => {
        console.log("this is error: ", error.message);
      });
    console.log('logging in: ' + userEmail + userPassword)
    }
    // const loginUser = () => {
    //   Axios.post('/login', {
    //     user_email: userEmail,
    //     password: userPassword
    //   }).then(response => console.log(response))
    //   .catch(error => {
    //     console.log("this is error", error.message);
    //   });
    // console.log('logging in' + userEmail + userPassword)
    // }

    // console.log(userEmail, userPassword)
    // }
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