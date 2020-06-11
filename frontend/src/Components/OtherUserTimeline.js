import React, {useState, useEffect} from 'react';
import AddTripForm from '../Components/AddTripForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function Timeline() {
  let { id } = useParams();

  const [userId, setUserId] = useState(id)
  const [userTripData, setUserTripData] = useState([])
  
  const getUserData = () => {
    Axios(`/user/trip/${userId}`)
    .then(response => {
    setUserTripData(response.data);
    })
    .catch(error => {
          console.log("this is error", error.message);
    });
  }  

  useEffect(() => {
    getUserData();
  }, []);

  
  return (
    <div className="timeline-container">
        
      <div className="trip-container">
        {userTripData ? userTripData.map((trip) => (
          <div key={trip.id} className="user-trip">
           
            <div className="trip-area">
              {trip.date_created}
              <h1>I went to {trip.trip_country} for {trip.trip_length} days and it was {trip.trip_bio}</h1>
              <div className="trip-images">
                <img
                  src={require("../images/" + trip.trip_image)}
                  id="trip-image"
                />
                </div>
              </div>
          </div>
        )) : "Please enter your travel journey"}
      </div>      
    </div>
  );
}

export default Timeline;
