import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router"
import { Form, Button } from 'react-bootstrap';
import AlertMessage from './Alert'
import Axios from 'axios';
import jwt_decode from 'jwt-decode'


export default function LogInForm() { 
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [alertShow, setAlertShow] = useState(false);
    
    let history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(errorMessage => "")

        if(userEmail === "" || userPassword === "") {
            console.log('ping')
            setErrorMessage(errorMessage => errorMessage + "Please fill out all inputs.")
            setAlertShow(true)
        } else {
            loginUser();
        }
    }

    const loginUser = (e) => {
        Axios.post('/auth/login', {
            user_email: userEmail,
            password: userPassword
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data);
        console.log(localStorage.usertoken);
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        setAlertShow(false)
        history.push("/profile");
        return response.data
      })
      .catch(error => {
        console.log("this is error: ", error.message);
        setErrorMessage("The email address or password is incorrect. Please try again.");
        setAlertShow(true);
      });
    }

    return(
        <div className="login-form-container">
            {errorMessage !== "" ? 
            (<AlertMessage show={alertShow} variant="danger" message={errorMessage}/>)
            : <div></div>
            }
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </div>
        )
    }