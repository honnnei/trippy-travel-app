
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import Axios from 'axios';

export default function SignUpForm() {
    const [displayName, setDisplayName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordAgain, setUserPasswordAgain] = useState("");
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const createUser = (e) => {
        //e.preventDefault();
        console.log('create user function')
        if (userPassword === userPasswordAgain) {
            setShow(false);
            if (userPassword.length < 6 || userPassword.length > 15) {
                setVisible(true);
                
            } else {
                setVisible(false);
                const data = {
                  email: userEmail,
                  password: userPassword,
                  display_name: displayName,
                };
                fetch("/user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => {
                    console.log(data);
                    if (!response.ok) throw new Error(response.status);
                      else return response.json();
                  })
                  .catch((error) => {
                    console.log("Error:", error);
                  });
            }
        } else {
            setShow(true);
            console.log("password not match");
        };
    }
    return (
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
            type="password"
            name="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Please re-enter your password</Form.Label>
          <Form.Control
            type="password"
            name="re-password"
            placeholder="Password"
            value={userPasswordAgain}
            onChange={(e) => setUserPasswordAgain(e.target.value)}
          />
        </Form.Group>
        <Link to="/profile">
          <Button variant="primary" type="submit" onClick={createUser}>
            Create Account
          </Button>
        </Link>
        <Alert show={show} variant="danger">
          <Alert.Heading>Sorry the password does not match !!</Alert.Heading>
        </Alert>
        <Alert show={visible} variant="danger">
          <Alert.Heading>
            Password must be between 6 -15 characters long
          </Alert.Heading>
        </Alert>
      </Form>
    );}