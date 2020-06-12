import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import OtherUserInfo from '../Components/OtherUserInfo'
import OtherUserMap from '../Components/OtherUserMap'
import { Button, Nav } from 'react-bootstrap'
import OtherUserGallery from '../Components/OtherUserGallery';
import OtherUserTimeline from '../Components/OtherUserTimeline';
import jwt_decode from 'jwt-decode'
import NavbarComponent from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import '../css/UserProfile.css'

function OtherUserProfile() {
  let { id } = useParams();
  // let id = props.match.params.id;

  const [mapShow, setMapShow] = useState(false);
  const [timelineShow, setTimelineShow] = useState(true);
  const [galleryShow, setGalleryShow] = useState(false);
  const [userId, setUserId] = useState(id);

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
              <div>
                <OtherUserInfo />
              </div>
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
                  {timelineShow ? <OtherUserTimeline /> : ""}
                  {galleryShow ? <OtherUserGallery /> : ""}
                  {mapShow ? <OtherUserMap /> : ""}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </div>

    );
}

export default OtherUserProfile;