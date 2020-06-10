import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import { Button, Nav } from 'react-bootstrap'
import Gallery from '../Components/Gallery';
import Followers from '../Components/Followers'
import Timeline from '../Components/Timeline';
import AddTripForm from '../Components/AddTripForm';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import jwt_decode from 'jwt-decode'
import NavbarComponent from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function UserProfile() {
  const [mapShow, setMapShow] = useState(true);
  const [timelineShow, setTimelineShow] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false);
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

  if(!localStorage.usertoken){
    window.location.href="/"
  }
  
  const toggleMap = () => {
    setMapShow(true)
    setTimelineShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }

  const toggleTimeline = () => {
    setTimelineShow(true)
    setMapShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }

  const toggleGallery = () => {
    setGalleryShow(true)
    setTimelineShow(false)
    setMapShow(false)
    setFollowersShow(false)
  }

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={2}>
            <UserInfo />
          </Col>
          <Col md={{ span: 9, offset: 1 }}>
            <div className="timeline-gallery-map-container">
              <Nav justify variant="tabs" defaultActiveKey="maps">
                <Nav.Item>
                  <Nav.Link eventKey="maps" onClick={toggleMap}> Map </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="timeline" onClick={toggleTimeline}> Timeline </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="gallery" onClick={toggleGallery}> Gallery </Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="t-g-m-container">
                {timelineShow ? <Timeline /> : ""}
                {galleryShow ? <Gallery /> : ""}
                {mapShow ? <UserMap /> : ""}
              </div>
            </div>
          </Col>        
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;







