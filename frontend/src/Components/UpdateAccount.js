import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';


function UpdateAccount() {

  const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);


  const getUserData = () => {
    console.log('get user request')
    Axios.get('/user/' + userId)
    .then(response => {
      console.log(response.data);
    });
  }

  const updateUserSettings = () => {
    console.log('update user settings')
    Axios.put(`/user/settings/` + userId, {
      user_email: userEmail,
      password: userPassword
    })
    .then( response => console.log(response) )
    .then( getUserData() )
    .catch(error => {
      console.log("Error:", error.message);
    });
  }

//   useEffect(()=>{
//     getUserData()
//   }, [])

  useEffect(() => {
    getUserData()
    setUserEmail(userData.user_email)
    setUserPassword(userData.password)
    }, [userData]);

    const handleUpdate = e => {
        if (e.target.name === 'user_email') {
          setUserEmail(e.target.value);
        }
        else {
          setUserPassword(e.target.value);
        }
    
      };

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
                        onChange={handleUpdate}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value = {userPassword} 
                        onChange = {handleUpdate}
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