import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

// import { Button } from "react-bootstrap";

function OtherUserGallery() {
//   const [showSignUp, setShowSignUp] = useState(true);
let { id } = useParams();

  const [userId, setUserId] = useState(id);
  const [userTripData, setUserTripData] = useState([]);
  
  //const a = require('../images');
  const getUserImages = () => {
    fetch(`/user/trip/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserTripData(data);
        const a = userTripData.trip_image;
      });
    
  };
  
  
  useEffect(() => {
    getUserImages();
  }, []);

  return (
    <div
      className="gallery-container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "1rem",
      }}
    >
      {userTripData.map((item) => (
        <div key={item.id} className="gallery">
          
          <img
            src={require("../images/" + item.trip_image)}
            style={{ width: "100px", height: "100px", cursor: "pointer" }}
          />
        
        </div>
      ))}
    </div>
  );
}

export default OtherUserGallery;
