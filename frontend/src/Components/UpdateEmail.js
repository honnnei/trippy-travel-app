import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import AlertMessage from './Alert'

function UpdateEmail() {
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  // const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [userId, setUserId] = useState(1);

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
        updateUserEmail()
    } 
}

  const validateForm = () => {
    let valid = true;
    if(userEmail === "" || newUserEmail === ""){
        setAlertMessage("Please fill out all inputs.")
        valid = false;
    } else if (userEmail === newUserEmail) {
        setAlertMessage("You cannot choose the same email.")
        valid = false;
    }
    return valid
  }

  const getUserData = () => {
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
    });
  }

  const updateUserEmail = () => {
    console.log('update user email')
    Axios.put(`/user/email`, {
      user_id: userId,
      user_email: userEmail,
      new_user_email: newUserEmail,
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
    setUserEmail(userData.user_email)
    }, [userData]);

  return (
    <div className="update-email-container">
        <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Current Email Address</Form.Label>
                  <Form.Control
                      id="email-input"
                      type="email"
                      name="user_email"
                      placeholder="Enter email"
                      value={userEmail}
                      onChange = {(e) => setUserEmail(e.target.value)}
                  />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Enter New Email Address</Form.Label>
                  <Form.Control
                      id="email-input-new"
                      type="email"
                      name="new_user_email"
                      placeholder="Enter email"
                      value={newUserEmail}
                      onChange = {(e) => setNewUserEmail(e.target.value)}
                  />
              </Form.Group>
              

              <Button variant="primary" type="submit">
                  Update Email Address
              </Button>
          </Form>
          <br></br>
          <AlertMessage show={alertShow} variant={alertVariant} message={alertMessage}/>
    </div>
  );
}

export default UpdateEmail;