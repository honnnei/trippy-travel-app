import React, { useState } from 'react';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import Gallery from '../Components/Gallery';
import Timeline from '../Components/Timeline';
import { Nav } from 'react-bootstrap'
import NavbarComponent from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// var jwtDecode = require('jwt-decode');
import '../css/UserProfile.css'


function UserProfile() {
  const [timelineShow, setTimelineShow] = useState(true);
  const [mapShow, setMapShow] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false);
  // const [userId, setUserId] = useState(jwtDecode(localStorage.usertoken).identity.user_id);

  if(!localStorage.usertoken){
    window.location.href="/"
  }
  
  const toggleMap = () => {
    setMapShow(true)
    setTimelineShow(false)
    setGalleryShow(false)
  }

  const toggleTimeline = () => {
    setTimelineShow(true)
    setMapShow(false)
    setGalleryShow(false)
  }

  const toggleGallery = () => {
    setGalleryShow(true)
    setTimelineShow(false)
    setMapShow(false)
  }

  return (
    <div className="user-profile-page-container" >
      <NavbarComponent />
        <Container>
          <Row>
            <Col className="user-profile-bio" md={3}>
              <UserInfo />
            </Col>
            <Col className="timeline-gallery-map-container" md={8}>
              <div>
                <Nav justify variant="tabs" defaultActiveKey="timeline">
                  <Nav.Item >
                    <Nav.Link id="toggleTimeline" eventKey="timeline" onClick={toggleTimeline}> Timeline </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="toggleMap" eventKey="maps" onClick={toggleMap}> Map </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="toggleGallery" eventKey="gallery" onClick={toggleGallery}> Gallery </Nav.Link>
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







