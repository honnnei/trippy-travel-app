import React, {useState, useEffect} from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import { Button } from 'react-bootstrap';
import Gallery from '../Components/Gallery';
import Timeline from '../Components/Timeline';
import AddTripForm from '../Components/AddTripForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jwt_decode from 'jwt-decode'

function UserProfile() {
  const [mapShow, setMapShow] = useState(true);
  const [timelineShow, setTimelineShow] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false);
  const [followersShow, setFollowersShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");
 
  

  const toggleAddTripModal = () => {
    setModal(!modal)
  };

  const toggleMap = () => {
    setMapShow(!mapShow)
    setTimelineShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }
  const toggleTimeline = () => {
    setTimelineShow(!timelineShow)
    setMapShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }
  const toggleGallery = () => {
    setGalleryShow(!galleryShow)
    setTimelineShow(false)
    setMapShow(false)
    setFollowersShow(false)
  }
  const toggleFollowers = () => {
    setFollowersShow(!followersShow)
    setTimelineShow(false)
    setGalleryShow(false)
    setMapShow(false)
  }
  const getUserId = () => {
      // console.log(localStorage.usertoken);
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      setUserId(decoded.identity.user_id)
      console.log(decoded.identity.user_id)
  }
  
  
  useEffect(() => {
    getUserId();
    }, []);

    return (
      <div className="user-profile-page-container">
            <UserInfo />
        <div className="timeline-gallery-map-container">
          <div className="t-g-m-navbar">
            <Button variant="secondary" onClick={toggleMap}>Map</Button>{' '}
            <Button variant="secondary" onClick={toggleTimeline}>Timeline</Button>{' '}
            <Button variant="secondary" onClick={toggleGallery}>Gallery</Button>{' '}
            <Button variant="secondary" onClick={toggleFollowers}>Followers</Button>{' '}
            <Button variant="secondary" onClick={toggleAddTripModal}>Add Trip</Button>{' '}
          </div>
          <div className="t-g-m-container">
            {timelineShow ? <Timeline /> : ""}
            {galleryShow ? <Gallery /> : ""}
            {mapShow ? <UserMap /> : ""}
          </div>
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
      </div>
    );
}

export default UserProfile;