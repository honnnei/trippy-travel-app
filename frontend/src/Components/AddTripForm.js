
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import Axios from 'axios';

export default function AddTripForm() {
    const [tripCountry, setTripCountry] = useState("");
    const [tripBio, setTripBio] = useState("");
    const [tripLength, setTripLength] = useState("");
    const [tripPhoto, setTripPhoto] = useState();
    // const [show, setShow] = useState(false);
    // const [visible, setVisible] = useState(false);

    const createTrip = (ev) => {
        ev.preventDefault();
        const data = new FormData();
        data.append('file', tripPhoto.files[0]);
        console.log(data)
        // fetch('http://localhost:8000/upload', {
        //   method: 'POST',
        //   body: data,
        // }).then((response) => {
        //   response.json().then((body) => {
        //     this.setState({ imageURL: `http://localhost:8000/${body.file}` });
        //   });
        // });
      }

    const createTrip2 = (e) => {
        e.preventDefault();
        console.log(tripPhoto)
        // if (userPassword === userPasswordAgain) {
        //     setShow(false);
        //     if (userPassword.length < 6 || userPassword.length > 15) {
        //         setVisible(true);
                
        //     } else {
        //         setVisible(false);
        //         const data = {
        //           email: userEmail,
        //           password: userPassword,
        //           display_name: displayName,
        //         };
        //         fetch("/user", {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify(data),
        //         })
        //           .then((response) => {
        //             console.log(data);
        //             if (!response.ok) throw new Error(response.status);
        //               else return response.json();
        //           })
        //           .catch((error) => {
        //             console.log("Error:", error);
        //           });
        //     }
        // } else {
        //     setShow(true);
        //     console.log("password not match");
        // };
    }

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Trip Country</Form.Label>
          <Form.Control
            type="text"
            name="trip_country"
            placeholder="Enter trip country"
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
          <Form.Label>Trip Photo</Form.Label>
          <Form.Control
            type="file"
            name="trip_photo"
            // value={tripPhoto}
            // onChange={(e) => setTripPhoto(e.target.value)}
            ref={(ref) => { tripPhoto = ref; }}
          />
           {/* <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div> */}
        </Form.Group>


        <Link to="/">
          <Button variant="primary" type="submit" onClick={createTrip}>
            Create Trip
          </Button>
        </Link>
      </Form>
    );}
 
