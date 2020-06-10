import React, {useState, useEffect} from 'react';
import AddTripForm from '../Components/AddTripForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

function Timeline() {
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userTripData, setUserTripData] = useState([])
  const [tripId, setTripId] = useState();
  const [lgShow, setLgShow] = useState(false);
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
  console.log(userTripData[0])
  const updateUserInfo = () => {
    console.log('put request')
    }

  const toggleAddTripModal = () => {
    setModal(!modal)
  };
  const toggleModal = () => {
    setEditModal(!editModal)
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteTrip = (id) => {
    console.log(id);
    const data = {
      trip : id
    }
    if (window.confirm("Are you sure you want to delete it forever") === true) {
      Axios.delete(`/trip/${id}`, data)
        .then((response) => {
          response.json();
        }).catch((error) => {
          console.log(error);
        }).then(window.location.reload(false));
    }
   
  };
  
  return (
    <div className="timeline-container">
      <div className="add-trip-area">
        <h1>Add Your Latest Trip </h1>
        <Button variant="secondary" onClick={toggleAddTripModal}>Add Trip</Button>{' '}
        <div className="modal">
          <Modal isOpen={modal} toggle={toggleAddTripModal}>
            <ModalHeader toggle={toggleAddTripModal}>Create a Trip:</ModalHeader>
            <ModalBody>
              <AddTripForm togglefunction={toggleAddTripModal} />
            </ModalBody>
          </Modal>
        </div>
      </div>
      <div className="trip-container">
        {userTripData ? userTripData.map((trip) => (
          <div key={trip.id} className="user-trip">
            <div className="button-area">
              <Button variant="danger" onClick={() => deleteTrip(trip.id)}>X</Button>
            </div>
            <div className="trip-area">
              {trip.date_created}
              <h1>I went to {trip.trip_country} for {trip.trip_length} days and it was {trip.trip_bio}</h1>
              <div className="trip-images">
                <img
                  src={require("../images/" + trip.trip_image)}
                  id="trip-image"
                />
                </div>
              </div>
          </div>
        )) : "Please enter your travel journey"}
      </div>      
    </div>
  );
}

export default Timeline;