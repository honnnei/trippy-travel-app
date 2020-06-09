import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jwt_decode from 'jwt-decode';

function UserInfo() {

  const [userData, setUserData] = useState({});
  const [userBio, setUserBio] = useState();
  const [userDisplayName, setUserDisplayName] = useState({});
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  
  const toggle = () => {
    setModal(!modal)
  };

  const getUserData = () => {
    Axios(`/user/${userId}`)
    .then(response => {
     setUserData(response.data);
    });
  }

  const updateUserInfo = () => {
    console.log('put request', userBio)
    Axios.put(`/user/${userId}`, {
      bio: userBio,
      display_name: userDisplayName
    })
      .then(response => response)
      .then(
        getUserData()
      )
      .catch(error => {
        console.log("this is error", error.message);
      });
  }
  

  useEffect(() => {
    getUserData();
    }, []);

    useEffect(() => {
      setUserBio(userData.bio);
      setUserDisplayName(userData.display_name)
      }, [userData]);

  const handleUpdate = e => {
    e.persist();
    if (e.target.name == 'userDisplayName') {
      setUserDisplayName(e.target.value);
    }
    else {
      setUserBio(e.target.value);
    }

  };
      

  console.log(userBio, userDisplayName )


  return (
    <div className="user-info-container">
      <div className="user-info-name-container">
        <h1>{userData ? userData.display_name : "default name"}</h1>
        <Button onClick={toggle} className="edit-profile-button">Edit Name</Button>
      </div>
      <div className="user-info-image-container">
        <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile picture" width="200" height="170" />
      </div>
      <div className="user-info-bio-container">
        <p>{userData ? userData.bio : "hi my bio"}</p>
        <Button onClick={toggle} className="edit-profile-button">Edit Name</Button>
      </div>
      <div className="user-info-country-counter">
      <p>I've visited (db) countries and counting!</p>
      </div>
        <div className="modal">
        <Modal isOpen={modal} toggle={toggle}> 
            <ModalHeader toggle={toggle}>Tell others on Trippy about Yourself:</ModalHeader>
            <ModalBody>
            <div className="habit-container">
                <form>
                  <label id="label-in-modal" htmlFor="userDisplayName">What do you want your name to be?</label>
                          <input
                          id="userDisplayName" 
                          name="userDisplayName" 
                          type="text"
                          value={userDisplayName}
                          onChange={handleUpdate}
                          ></input>
                    <label id="label-in-modal" htmlFor="userBio">What are you about?</label>
                        <input
                        id="userBio" 
                        name="userBio" 
                        type="textarea"
                        value={userBio}
                        onChange={handleUpdate}
                        ></input>

                  </form>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button className="modalBtn" onClick={() => {toggle(); updateUserInfo(); getUserData();}}>Create</Button>
              <Button className="modalBtn2" onClick={toggle} id="cancel" >Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    </div>
  );
}

export default UserInfo;