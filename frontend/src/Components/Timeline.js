import React, {useState, useEffect} from 'react';
import AddTripForm from '../Components/AddTripForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import Axios from 'axios';


function Timeline() {
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [modal, setModal] = useState(false);
  const [userTripData, setUserTripData] = useState([])
  //   const [showSignUp, setShowSignUp] = useState(true);
  const getUserData = () => {
    Axios(`/user/trip/${userId}`)
    .then(response => {
    setUserTripData(response.data);
    console.log(response.data)
    })
    .catch(error => {
          console.log("this is error", error.message);
    });
  }

  console.log(Array.isArray(userTripData))
  console.log(Array.isArray([1, 2, 3]))
  console.log(userTripData[0])
  const updateUserInfo = () => {
    console.log('put request')
    // Axios.put(`/user/${userId}`, {
    //   bio: userBio,
    //   display_name: userDisplayName
    // })
    //   .then(response => response)
    //   .then(
    //     getUserData()
    //   )
    //   .catch(error => {
    //     console.log("this is error", error.message);
    //   });
  }

  const toggleAddTripModal = () => {
    setModal(!modal)
  };

  useEffect(() => {
    getUserData();
    }, []);

    const handleUpdate = e => {
      // e.persist();
      // if (e.target.name == 'userDisplayName') {
      //   setUserDisplayName(e.target.value);
      // }
      // else {
      //   setUserBio(e.target.value);
      // }
  
    };

  return (
    <div className="timeline-container">
      <h1>This is time liney</h1>
      <Button variant="secondary" onClick={toggleAddTripModal}>Add Trip</Button>{' '}
      <div className="modal">
            <Modal isOpen={modal} toggle={toggleAddTripModal}> 
              <ModalHeader toggle={toggleAddTripModal}>Create a Trip:</ModalHeader>
              <ModalBody>
                  <AddTripForm togglefunction={toggleAddTripModal}/>
              </ModalBody>
              <ModalFooter>
                <Button className="modalBtn" onClick={() => {toggleAddTripModal();}}>Create</Button>
                <Button className="modalBtn2" onClick={toggleAddTripModal} id="cancel" >Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
          {userTripData ? userTripData.map(trip => (
            <div>
              <h1>I went to {trip.trip_country} for {trip.trip_length} days, and it was {trip.trip_bio}</h1>
            </div>
            )
          ) : ""}
    </div>
  );
}

export default Timeline;