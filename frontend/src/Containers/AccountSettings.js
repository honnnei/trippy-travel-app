import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import UpdateAccount from '../Components/UpdateAccount';
import NavbarComponent from '../Components/Navbar';


function AccountSettings() {

    return (
      <div>
        <NavbarComponent />
        <div className="user-profile">
            <h1>Account Settings</h1>
            <UpdateAccount />
        </div>
      </div>
    );
}

export default AccountSettings;