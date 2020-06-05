
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function SignUpForm() {
    const [displayName, setDisplayName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordAgain, setUserPasswordAgain] = useState("");
  
  
    const createUser = (e) => {
        e.preventDefault();
        // e.persist();
        console.log('create user function')
        // if (userPassword === userPasswordAgain) {
        //     console.log(displayName, userEmail, userPassword, userPasswordAgain)
            Axios.post('/', {
                email : "email@gmail.com",
                password : "passwordUser",
                display_name : "user display name",
              }).then(response => console.log(response))
              .catch(error => {
                console.log("this is error", error.message);
              });
              console.log('creating user')
        // }
    }
    
    return(
        <Form>
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
                type="text" 
                name="password"
                placeholder="Password" 
                value = {userPassword} 
                onChange = {(e) => setUserPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Please re-enter your password</Form.Label>
                <Form.Control 
                    type="password"
                    name="re-password"
                placeholder="Password"
                value={userPasswordAgain}
                onChange = {(e) => setUserPasswordAgain(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={createUser}>
                Create Account
            </Button>
        </Form>

)}