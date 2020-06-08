import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function UserInfo() {

  const [userData, setUserData] = useState();
  const [userBio, setUserBio] = useState();
  const [bioUpdate, setBioUpdate] = useState();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
  };

  const updateBio = () => {
    console.log('put request')
  }
  
  const getUserData = () => {
    console.log('get request')
  }

  useEffect(() => {
    Axios('/user/1')
     .then(response => {
      setUserData(response.data);
      console.log(userData)
      console.log(response.data)
     });
    }, []);

    useEffect(() => {
      // setUserBio(userData.bio)
      console.log(userData)
      }, [userData]);

  const handleBioUpdate = e => {
    e.persist();
    setBioUpdate(e.target.value);
  };
      

  console.log(bioUpdate)


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
                    <label id="label-in-modal" htmlFor="habitName">What are you about?</label>
                        <input
                        id="habitName" 
                        name="habitName" 
                        type="textarea"
                        value={bioUpdate}
                        onChange={handleBioUpdate}
                        ></input>
                  </form>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button className="modalBtn" onClick={() => {toggle(); updateBio(); getUserData();}}>Create</Button>
              <Button className="modalBtn2" onClick={toggle} id="cancel" >Cancel</Button>
            </ModalFooter>
          </Modal>
        
    </div>
  );
}

export default UserInfo;