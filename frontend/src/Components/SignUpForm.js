import React, { useState, useEffect } from 'react';
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
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlertVariant] = useState(null);
    const [alertMessage, setAlertMessage] = useState("default error");

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = validateForm();
        if(valid === false){
            setAlertVariant("danger");
            setAlertShow(true);        
        } else {
            postUser()
        } 
    }

    const validateForm = () => {
        let valid = true;
        if(displayName === "" || userEmail === "" || userPassword === "" || userPasswordAgain === "") {
            setAlertMessage("Please fill out all inputs.")
            valid = false;
        } else if (userPassword !== userPasswordAgain) {
            setAlertMessage("The passwords do not match.")
            valid = false;
        }
        return valid
    }

    const postUser = () => {
        Axios.post('/auth/register', { user_email : userEmail, password : userPassword, display_name : displayName })
        .then( data => {
            console.log(data);
            if(data.data.error_message){
                setAlertMessage(data.data.error_message)
                setAlertVariant('danger')
                setAlertShow(true)
            } else if(data.data.success_message){
                setAlertMessage(data.data.success_message)
                setAlertVariant('success')
                setAlertShow(true)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        })
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

            <AlertMessage show={alertShow} variant={alertVariant} message={alertMessage}/>

        </div>
)}
