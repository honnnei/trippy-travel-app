import React, {useState, useEffect, useCallback} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Form from 'react-bootstrap/Form'
import jwt_decode from 'jwt-decode'
import '../css/UserInfo.css'

function UserInfo() {

  const [userData, setUserData] = useState({});
  const [userBio, setUserBio] = useState('default bio');
  const [userDisplayName, setUserDisplayName] = useState('default name');
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUserData = () => {
    console.log('get user request')
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
      console.log(response.data);
    });
  }


  const updateUserInfo = () => {
    console.log('update user request')
    Axios.put(`/user/` + userId, {
      bio: userBio,
      display_name: userDisplayName
    })
    .then( response => console.log(response) )
    .then( getUserData() )
    .catch(error => {
      console.log("Error:", error.message);
    });
      handleClose();
  }
  
  useEffect(()=>{
    getUserData();
  }, [])

  useEffect(() => {
    setUserBio(userData.bio);
    setUserDisplayName(userData.display_name)
    }, [userData]);

  const handleUpdate = e => {
    if (e.target.name === 'userDisplayName') {
      setUserDisplayName(e.target.value);
    }
    else {
      setUserBio(e.target.value);
    }

  };

  
 
  return (
    <div className="user-info-container">
      <div className="user-info-name-container">
        <h1 className="user-info-display-name" >{userData ? userData.display_name : "default name"}</h1>
        
      </div>
      <div className="user-info-image-container">
        <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile picture" width="200" height="170" />
      </div>
      <div className="user-info-bio-container">
        <p>{userData ? userData.bio : "hi my bio"}</p>
      </div>
      <div className="user-info-country-counter">
      <p>I've visited (db) countries and counting!</p>
      <Button onClick={handleShow} className="edit-profile-button">Edit profile</Button>
      </div>
        <div className="modal">
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit your profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Update your display name</Form.Label>
                    <Form.Control type="text" name="userDisplayName" value={userDisplayName} onChange={handleUpdate}/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Update your bio</Form.Label>
                    <Form.Control type="text" value={userBio} onChange={handleUpdate}/>
                  </Form.Group>
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button className="modalBtn" onClick={() => {handleClose(); updateUserInfo(); getUserData();}}>Update</Button>
                <Button classsName="modalBtn2" onClick={handleClose} id="cancel">Cancel</Button>
              </Modal.Footer>
          </Modal>
        </div>
        
    </div>
  );
}

export default UserInfo;


