import React, {useState, useEffect, useCallback} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import Form from 'react-bootstrap/Form'
import jwt_decode from 'jwt-decode';
import FormData from 'form-data';
import '../css/UserInfo.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function OtherUserInfo() {
  let { id } = useParams();

  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(id);

  const [userBio, setUserBio] = useState();
  const [userDisplayName, setUserDisplayName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [profilePictureURL, setProfilePictureURL] = useState();
 
  const getUserData = () => {
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
    });
  }

  const updateUserInfo = () => {
    let bodyFormData = new FormData();
    bodyFormData.set('bio', userBio);
    bodyFormData.set('display_name', userDisplayName);
    bodyFormData.append('file', profilePicture);
    Axios.put(`/user/${userId}`, bodyFormData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
      }
    })
    .then( response => console.log(response) )
    .then( getUserData() )
    .catch(error => {
      console.log("Error:", error.message);
    });
  }
  
  useEffect(()=>{
    getUserData();
  }, [])

  useEffect(() => {
    setUserBio(userData.bio);
    setUserDisplayName(userData.display_name);
    setProfilePictureURL(userData.profile_picture);
    }, [userData]);

 
  return (
    <div className="user-info-container">
      <div className="user-info-name-container">
        <h1 className="user-info-display-name" >{userData ? userData.display_name : "default name"}</h1>
      </div>
      <div className="user-info-image-container">
        {profilePictureURL ? <img src={require("../images/" + profilePictureURL)} alt="profile picture" width="200" height="170" /> : <img src={require("../images/" + 'default_profile_picture.jpg')} alt="profile picture" width="200" height="170" />}
      </div>
      <div className="user-info-bio-container">
        <p>{userData ? userData.bio : "hi my bio"}</p>
      </div>
      <div className="user-info-country-counter">
      <p>I've visited (db) countries and counting!</p>
      </div> 
    </div>
  );
}

export default OtherUserInfo;


