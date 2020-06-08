
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
//import Axios from 'axios';

export default function AddTripForm() {
  const [tripCountry, setTripCountry] = useState("");
  const [tripBio, setTripBio] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [tripPhoto, setTripPhoto] = useState();

  return (
    <Form action="/image" method="POST" encType="multipart/form-data">
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
          placeholder="enter image"
          value={tripPhoto}
          onChange={(e) => setTripPhoto(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" >
        Create Trip
          </Button>

    </Form>
);
}

