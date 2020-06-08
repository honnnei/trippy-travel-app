import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import AlertMessage from './Alert'


export default function SignUpForm() {
    const [displayName, setDisplayName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordAgain, setUserPasswordAgain] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("Account created successfully!");
    const [successAlertShow, setSuccessAlertShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [variant, setVariant] = useState(null);

    

    let history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // setErrorMessage("");
        // setAlertShow(false);
        // setSuccessAlertShow(false);

        if(displayName === "" || userEmail === "" || userPassword === "" || userPasswordAgain === "") {
            console.log('ping')
            setErrorMessage(errorMessage => errorMessage + "Please fill out all inputs.")
            setAlertShow(true)
        } else if (userPassword !== userPasswordAgain) {
            console.log('ping')
            setErrorMessage(errorMessage => errorMessage + "The passwords do not match.")
            setAlertShow(true)
        } else if (errorMessage === ""){
            console.log('ping')
            const exists = checkUserEmailExists()
            exists.then(exist => exist ? setErrorMessage(errorMessage => errorMessage + "An account with that email address already exists.") : postUser())
        }
        // if( errorMessage === "" ) {
        //     console.log('pong')
        //     setSuccessAlertShow(true)
        // } else {
        //     console.log('peng')
        //     setAlertShow(true)
        // }
    }

    const checkUserEmailExists = async () => {
        try {
            const data = await Axios.post('/check/user', {user_email : userEmail});
            // const response = await data.json();
            console.log(data)
            return data.data.exists
        } catch(error){
            alert(error)
        }
    }

    const emailError = () => {
        setErrorMessage(errorMessage => errorMessage + "An account with that email address already exists.")
        
    }

    const postUser = () => {
        Axios.post('/auth/register', {
            user_email : userEmail,
            password : userPassword,
            display_name : displayName,
        })
        .then(response => console.log(response))
        .catch(error => setErrorMessage(error));
        console.log('postUser()')
        setAlertShow(false)
        setSuccessAlertShow(true)
    }

    return(
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                    type="text"
                    name="display_name"
                    placeholder="Enter display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="user_email"
                    placeholder="Enter email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value = {userPassword} 
                    onChange = {(e) => setUserPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                    type="password"
                    name="re-password"
                    placeholder="Password"
                    value={userPasswordAgain}
                    onChange = {(e) => setUserPasswordAgain(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Account
            </Button>
        </Form>

        {errorMessage !== "" ? 
        (<AlertMessage show={alertShow} variant="danger" message={errorMessage}/>)
        :
        (<AlertMessage show={successAlertShow} variant="success" message={successMessage}/>)
        }

        </div>
)}