
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
//import Axios from 'axios';

export default function AddTripForm() {
    const [tripCountry, setTripCountry] = useState("");
    const [tripBio, setTripBio] = useState("");
    const [tripLength, setTripLength] = useState("");
    const [tripPhoto, setTripPhoto] = useState();

    const createTrip = (ev) => {
        ev.preventDefault();

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Upload an image</h1>
                    <hr />
                    <form action="/image" method="POST" encType="multipart/form-data">
                        <div className="form-group">
                            <label>Select image</label>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="image" id="image" />
                                <label className="custom-file-label" htmlFor="image">Select image...</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <div className="custom-file">
                                <input type="text" className="form-control" id="trip_country" name="trip_country" placeholder="" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <div className="custom-file">
                                <input type="text" className="form-control" id="trip_bio" name="trip_bio" placeholder="" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>trip length</label>
                            <div className="custom-file">
                                <input type="text" className="form-control" id="trip_length" name="trip_length" placeholder="" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

