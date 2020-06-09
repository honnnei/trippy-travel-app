import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

function Gallery() {
//   const [showSignUp, setShowSignUp] = useState(true);
  const [userId, setUserId] = useState(
    jwt_decode(localStorage.usertoken).identity.user_id
  );
  const [userTripData, setUserTripData] = useState([]);
  //const a = require('../images');
  const getUserImages = () => {
    fetch(`/user/trip/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserTripData(data);
        const a = userTripData.trip_image;
        console.log(a);
      });
    
  };
  
  useEffect(() => {
    getUserImages();
  }, []);

  return (
    <div className="gallery-container">
      <h1>This is gallery {userId}</h1>
      {userTripData.map((item) => (
        <div key={item.id}>
         <br />
          
          <img
            src={require('../images/'+item.trip_image)}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
