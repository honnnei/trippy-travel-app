import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

function Gallery() {
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [userTripData, setUserTripData] = useState([]);
  
  const getUserImages = () => {
    Axios(`/user/trip/${userId}`)
      .then((data) => {
        setUserTripData(data);
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

export default Gallery;
