
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode'

export default function AddTripForm(props) {
    const [tripCaption, setTripCaption] = useState("");
    const [tripPhoto, setTripPhoto] = useState();
    const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);

    return (
        <Form action="/gallery" method="POST" encType="multipart/form-data">
            <Form.Control type="hidden" name="user_id" value={userId} />
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Caption me</Form.Label>
                <Form.Control
                    type="text"
                    name="trip_caption"
                    placeholder="Enter image caption"
                    value={tripCaption}
                    onChange={(e) => setTripCaption(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Crazy Memories</Form.Label>
                <Form.Control
                    type="file"
                    name="image"
                    multiple="true"
                    autocomplete="off"
                    placeholder="enter image"
                    onChange={(e) => setTripPhoto(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Upload Image
      </Button>
        </Form>
    );
}