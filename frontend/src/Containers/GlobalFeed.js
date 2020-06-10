import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import Axios from 'axios';

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
    <div className="user-profile">
      <NavbarComponent />
      <h1>GlobalFeed</h1>
      <div>

        {
        tripData ? tripData.map(trip => (
        <div key={trip.id} className="feed-trip">
          <p> Trip user: {trip[4]} </p>
          <p> Trip country: {trip[0]} </p>
          <p> Trip bio: {trip[1]} </p>
          <p> Trip created: {trip[3]} </p>
          <p> Trip image: <img src={require("../images/" + trip[2])} style={{ width: "100px", height: "100px", cursor: "pointer" }}
            /> 
          </p>




        </div>))
        : <p>Loading...</p>
        }

      </div>
    </div>
  );
}

export default GlobalFeed;