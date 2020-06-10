import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import Axios from 'axios';
import '../css/GlobalFeed.css'

function GlobalFeed() {
  const [feedData, setFeedData] = useState([])  

  const getFeedData = () => {
    Axios(`/trip/feed`)
    .then(response => {
    setFeedData(response.data);
    })
    .catch(error => {
          console.log("this is error", error.message);
    });
  }

  useEffect(() => {
    getFeedData();
  }, []);


  return (
    <div className="global-feed">
      <NavbarComponent />
      <h1>Global Feed</h1>
      <div>

        {
        feedData ? feedData.reverse().map(trip => (
        <div key={trip.id} className="feed-trip">
          <div className="user-info">
          <img src={require("../images/" + trip[5])} style={{ height: "10em", width:"auto", cursor: "pointer" }}/>            
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