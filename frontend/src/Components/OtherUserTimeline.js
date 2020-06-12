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
import { Container, Row, Col } from 'react-bootstrap';


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
            <Container>
              <Row>
                <Col>
                      <h4>{trip.trip_country}</h4>
                      <p>{trip.trip_bio}</p>
                      {trip.date_created.split('T')[0].split('-').reverse().join('/')}
                </Col>
                <Col>
                  <div className="trip-images">
                    <img width="10px" height="10px" src={require("../images/" + trip.trip_image)} id="trip-image"/>  
                  </div>
                </Col>
              </Row>
            </Container>
            
              
            </div>
          </div>
        )) : "Please enter your travel journey"}
      </div>      
    </div>
  );
}

export default Timeline;
