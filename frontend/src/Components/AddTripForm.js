
import React, {  useState } from 'react';
import {  Link } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
//import Axios from 'axios';

export default function AddTripForm() {
  const [tripCountry, setTripCountry] = useState("");
  const [tripBio, setTripBio] = useState("");
  // const [tripLength, setTripLength] = useState("");
  const [tripPhoto, setTripPhoto] = useState();
  // const [show, setShow] = useState(false);
  // const [visible, setVisible] = useState(false);

  const createTrip = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append('file', tripPhoto[0]);
    console.log(data)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Upload an image</h1>
          <hr/>
            <form action="/image" method="POST" enctype="multipart/form-data">
              <div className="form-group">
                <label>Select image</label>
                <div className="custom-file">
                  <input type="file" class="custom-file-input" name="image" id="image"/>
                  <label class="custom-file-label" for="image">Select image...</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
      </div>
    </div>
  );
}
 
