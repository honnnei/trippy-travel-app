import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import Axios from 'axios';
import '../css/GlobalFeed.css'


//import { BrowserRouter as Router } from 'react-router-dom';

function GlobalFeed() {
  //const [users, setUsers ] = useState();
  
  const [tripData, setTripData] = useState([])  

  const getTripData = () => {
    Axios(`/trip/feed`)
    .then(response => {
    setTripData(response.data);
    console.log(response.data)
    })
    .catch(error => {
          console.log("this is error", error.message);
    });
  }

  useEffect(() => {
    getTripData();
  }, []);

console.log(tripData)

  return (
    <div className="global-feed">
      <NavbarComponent />
      <h1>Global Feed</h1>
      <div>

        {
        tripData ? tripData.reverse().map(trip => (
        <div key={trip.id} className="feed-trip">
          <div className="user-info">
          <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile picture" width="" height="170" />
            <p className="trip-user"> {trip[4]} </p>
            <p className="trip-date"> {trip[3].split(' ')[0].split('-').reverse().join('-')} </p>
          </div>
          <div className="trip-info">
            <p className="trip-country"> {trip[0]} </p>
            <p className="trip-bio"> {trip[1]} </p>
          </div>
          <div className="trip-image">
            <img src={require("../images/" + trip[2])} style={{ height: "10em", width:"auto", cursor: "pointer" }}/> 
          </div>
        </div>))
        : <p>Loading...</p>
        }

      </div>
    </div>
  );
}

export default GlobalFeed;