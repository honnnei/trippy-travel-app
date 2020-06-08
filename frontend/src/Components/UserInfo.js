import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function UserInfo() {

  const [userData, setUserData] = useState({});
  const [userBio, setUserBio] = useState();
  const [userDisplayName, setUserDisplayName] = useState({});
  const [modal, setModal] = useState(false);
 
  

  const toggle = () => {
    setModal(!modal)
  };

  const getUserData = () => {
    Axios('/user/1')
    .then(response => {
     setUserData(response.data);
    });
  }

  const updateUserInfo = () => {
    console.log('put request', userBio)
    Axios.put(`/user/1`, {
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
    <div className="user-info">
        <h1>{userData ? userData.display_name : "default name"}</h1>
        <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile picture" width="200" height="170" />
        <p>{userData ? userData.bio : "hi my bio"}</p>
        <p>I've visited (db) countries and counting!</p>
        <Button onClick={toggle}>Edit Bio</Button>
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
  );
}

export default UserInfo;