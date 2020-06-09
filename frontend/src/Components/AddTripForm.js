
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode'

export default function AddTripForm(props) {
  const [tripCountry, setTripCountry] = useState("");
  const [tripBio, setTripBio] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [tripPhoto, setTripPhoto] = useState();
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

  const handleChange = (e) => {
    let file = e.target.files;
    setTripPhoto(file);

  }
  const addTripButton = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", tripPhoto);
    const data = {
      trip_country: tripCountry,
      trip_bio: tripBio,
      trip_length: tripLength,
      user_id: userId,
      image: tripPhoto,
    };
    console.log(data);
    Axios.post("/trip", data)
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
      });
    
  }

  return (
    <Form encType="multipart/form-data">
      <Form.Control type="hidden" name="user_id" value={userId} />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Trip Country</Form.Label>
        <Form.Control
          type="text"
          name="trip_country"
          placeholder="Enter country name"
          value={tripCountry}
          onChange={(e) => setTripCountry(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Trip Bio</Form.Label>
        <Form.Control
          type="text"
          name="trip_bio"
          placeholder="Enter trip bio"
          value={tripBio}
          onChange={(e) => setTripBio(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Trip duration</Form.Label>
        <Form.Control
          type="text"
          name="trip_length"
          placeholder="trip duration"
          value={tripLength}
          onChange={(e) => setTripLength(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Select the trip photo</Form.Label>
        <Form.Control
          type="file"
          name="image"
          multiple="true"
          autocomplete="off"
          placeholder="enter image"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={addTripButton}>
        Create Trip
      </Button>
    </Form>
  );
}
