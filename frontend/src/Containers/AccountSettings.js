import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import UpdateAccount from '../Components/UpdateAccount'


function AccountSettings() {

    return (
      <div className="user-profile">
          <h1>Account Settings</h1>
          <UpdateAccount />
      </div>
    );
}

export default AccountSettings;