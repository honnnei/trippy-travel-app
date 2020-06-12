
import React, { useState, useEffect } from 'react';
import AddGalleryForm from '../Components/AddGalleryForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
// import { Button } from "react-bootstrap";

function Gallery() {

  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [modal, setModal] = useState(false);
  const [userTripData, setUserTripData] = useState([])

  //const a = require('../images');
  const getUserImages = () => {
    fetch(`/user/gallery/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserTripData(data);
        console.log(data);
      });


  };
  const toggleAddGalleryModal = () => {
    setModal(!modal)
  };


  useEffect(() => {
    getUserImages();
  }, []);
  const deleteImage = (id) => {
    console.log(id);
    const data = {
      gallery: id
    }
    if (window.confirm("Are you sure you want to delete it forever") === true) {
      Axios.delete(`/gallery/${id}`, data)
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
        <h3>Save your Trip Memories</h3>
        <Button variant="secondary" onClick={toggleAddGalleryModal}>Upload Images</Button>{' '}
        <div className="modal">
          <Modal isOpen={modal} toggle={toggleAddGalleryModal}>
            <ModalHeader toggle={toggleAddGalleryModal}>Gallery:</ModalHeader>
            <ModalBody>
              <AddGalleryForm togglefunction={toggleAddGalleryModal} />
            </ModalBody>
          </Modal>
        </div>
      </div>
      <div className="trip-container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "1rem",
      }}>

        {userTripData.map((item) => (
          <div key={item.id} className="gallery">
            
              <Button variant="danger" onClick={() => deleteImage(item.id)}>X</Button>
            <a href={require("../images/" + item.gallery_image)} target="_blank">
            <img
              src={require("../images/" + item.gallery_image)}
              style={{ width: "200px", height: "auto", cursor: "pointer" }}
              />
            {item.image_caption}
            </a>

          </div>
        ))}
      </div>

    </div>

  );
}

export default Gallery;
