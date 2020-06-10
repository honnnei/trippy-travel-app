import React, {useState, useEffect, useCallback} from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import UpdatePassword from '../Components/UpdatePassword';
import NavbarComponent from '../Components/Navbar';
import UpdateEmail from '../Components/UpdateEmail';
import Axios from 'axios';
import { Button } from 'react-bootstrap';


function AccountSettings() {
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

  const deleteUser = () => {
    console.log('Deleting User')
    Axios.delete(`/user/` + userId)
    .then( response => console.log(response) )
    .then(localStorage.removeItem('usertoken'))
    .then( window.location.href = "/")
    .then(console.log('User deleted.'))
    .catch(error => {
      console.log("Error:", error.message);
    });
  }

    return (
      <div>
        <NavbarComponent />
        <div className="user-profile">
            <h1>Account Settings</h1>
            <UpdateEmail />
            <br ></br>
            <UpdatePassword />
            <br></br>
            <Button variant="danger" onClick={deleteUser}>Delete Account</Button>
        </div>
      </div>
    );
}

export default AccountSettings;