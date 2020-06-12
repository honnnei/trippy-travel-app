import React, {useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import AlertMessage from './Alert'
import jwt_decode from 'jwt-decode';
import '../css/AccountSettings.css'



function UpdatePassword() {

  const [userData, setUserData] = useState([]);
  const [userPassword, setUserPassword] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPasswordAgain, setNewUserPasswordAgain] = useState("");
  const [userId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [alertShow, setAlertShow] = useState(false);
  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState("default error");


  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = validateForm();
    if(valid === false){
        setAlertVariant("danger");
        setAlertShow(true);        
    } else {
        updateUserPassword()
    } 
}

  const validateForm = () => {
    let valid = true;
    if(userPassword === "" || newUserPassword === "" || newUserPasswordAgain === ""){
        setAlertMessage("Please fill out all inputs.")
        valid = false;
    } else if (newUserPassword !== newUserPasswordAgain) {
        setAlertMessage("The new passwords do not match.")
        valid = false;
    }
    return valid
}

  const getUserData = () => {
    console.log('get user request')
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
      console.log(response.data);
    });
  }

  const updateUserPassword = () => {
    console.log('update user password')
      Axios.put(`/user/password`, {
      user_id: userId,
      password: userPassword,
      new_password: newUserPassword
    })
    .then( response => console.log(response) )
    .then( window.location.href = "/profile")
    .catch( error => {console.log("Error:", error.message)})
    }

  useEffect(()=>{
    getUserData()
  }, [])

  useEffect(() => {
    setUserPassword(userData.password)
    }, [userData]);


    return (
      <div className="update-password">
          <Form className="update-password-form1" onSubmit={handleSubmit}>

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
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="re-password"
                        placeholder="Confirm new password"
                        onChange = {(e) => setNewUserPasswordAgain(e.target.value)}
                    />
                </Form.Group>
               

                <Button variant="dark" type="submit">
                    Update Password
                </Button>
            </Form>
            <AlertMessage show={alertShow} variant={alertVariant} message={alertMessage}/>
      </div>
    );
}

export default UpdatePassword;