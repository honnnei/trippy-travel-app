import React, {useState, useEffect} from 'react';
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
  const [followersShow, setFollowersShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
 
  

  const toggleAddTripModal = () => {
    setModal(!modal)
  };

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
  const toggleFollowers = () => {
    setFollowersShow(true)
    setTimelineShow(false)
    setGalleryShow(false)
    setMapShow(false)
  }
  // const getUserId = () => {
  //     // console.log(localStorage.usertoken);
  //     const token = localStorage.usertoken;
  //     const decoded = jwt_decode(token);
  //     setUserId(decoded.identity.user_id)
  //     console.log(decoded.identity.user_id)
  // }
  
  
  // useEffect(() => {
  //   getUserId();
  //   }, []);

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
                    <Nav.Item>
                      <Nav.Link eventKey="followers" onClick={toggleFollowers} > Followers </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="t-g-m-container">
                    {timelineShow ? <Timeline /> : ""}
                    {galleryShow ? <Gallery /> : ""}
                    {mapShow ? <UserMap /> : ""}
                    {followersShow ? <Followers /> : ""}

                  </div>
              </div>
            </Col>
                      
          </Row>
        </Container>
            <div className="modal">
              <Modal isOpen={modal} toggle={toggleAddTripModal}> 
                <ModalHeader toggle={toggleAddTripModal}>Create a Trip:</ModalHeader>
                <ModalBody>
                    <AddTripForm />
                </ModalBody>
                <ModalFooter>
                  <Button className="modalBtn" onClick={() => {toggleAddTripModal();}}>Create</Button>
                  <Button className="modalBtn2" onClick={toggleAddTripModal} id="cancel" >Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          
        
      
     </div>

    );
}

export default UserProfile;







