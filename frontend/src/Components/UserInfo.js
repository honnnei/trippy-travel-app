import React, {useState, useEffect, useCallback} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Form from 'react-bootstrap/Form'
import jwt_decode from 'jwt-decode';
import FormData from 'form-data';
import '../css/UserInfo.css'

function UserInfo() {

  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userBio, setUserBio] = useState();
  const [userDisplayName, setUserDisplayName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [modal, setModal] = useState(false);
 
  const toggle = () => {
    setModal(!modal)
  };
  
  const getUserData = () => {
    Axios.get('/user/' + userId)
    .then(response => {
      setUserData(response.data);
    });
  }

  const updateUserInfo = () => {
    let bodyFormData = new FormData();
    bodyFormData.set('bio', userBio);
    bodyFormData.set('display_name', userDisplayName);
    bodyFormData.append('file', profilePicture);

    Axios.put(`/user/${userId}`, bodyFormData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
      }
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
    e.persist();
    if (e.target.name === 'userDisplayName') {
      setUserDisplayName(e.target.value);
    }
    if (e.target.name === 'userBio'){
      setUserBio(e.target.value);
    }
    if (e.target.files) {
      let file = e.target.files[0];
      setProfilePicture(file);
    }

  };
  let profile_picture_url;
  userData.profile_picture ? profile_picture_url = require("../images/" + userData.profile_picture) : profile_picture_url =  ""
  
 
  return (
    <div className="user-info-container">
      <div className="user-info-name-container">
        <h1 className="user-info-display-name" >{userData ? userData.display_name : "default name"}</h1>
      </div>
      <div className="user-info-image-container">
        {/* {userData ? <h1>{profile_picture_url}</h1> : ""} */}
        {userData.profile_picture ? <img src={profile_picture_url} alt="profile picture" width="200" height="170" /> : ""}
        {/* {userData ? <img src={require("../images/" + 'default_profile_picture.jpg')} alt="profile picture" width="200" height="170" /> : ""} */}
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
                    <Form.Control type="text" name="userBio" value={userBio} onChange={handleUpdate}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Update your profile picture</Form.Label>
                    <Form.Control 
                    type="file"
                    name="profile_picture"
                    multiple="false"
                    autoComplete="off"
                    placeholder="choose image"
                    onChange={handleUpdate}
                    />
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


