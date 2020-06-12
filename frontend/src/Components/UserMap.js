import React, {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow"


function UserMap() {
  const [userId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [userTripData, setUserTripData] = useState([])

  
  const countryArray = userTripData.map(trip => trip.trip_country_code);
  let countryArrayFiltered = [...new Set(countryArray)];
  let count = Object.keys(countryArrayFiltered).length;


    
    // Default data

    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);
    // Set map definition
    chart.geodata = am4geodataWorldLow;
    // Set projection
    chart.projection = new am4maps.projections.Miller();
    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#15CABD");
    polygonTemplate.stroke = am4core.color("#138D9D");
    polygonTemplate.propertyFields.fill = "color";
    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#fcbb8d");
    // Create active state
    let activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = am4core.color("#FBAA7C")

    polygonTemplate.events.on("ready", function(ev) {
        if (countryArray) {
          countryArray.forEach(id => {
            polygonSeries.getPolygonById(id).isActive = true;
        })
        }
        
    });

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];
    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

  const getUserData = () => {
    Axios(`/user/trip/${userId}`)
    .then(response => setUserTripData(response.data))
    .catch(error => console.log("this is error", error.message))
  }

  useEffect(() => {
    console.log('useEffect() fired')
    getUserData();
    }, []);
    console.log(userTripData)

    return (
      <div className="user-map" style={{padding:"1em"}}>
        <p>Countries Visited: {count}</p>
        {userTripData ? 
         <div id="chartdiv" style={{backgroundColor: "#138D9D", height: "400px", width: "100%", padding:"1em", borderRadius: '1em'}} />
         :
         <p> Loading...</p>
        }
      </div>
    );
}
export default UserMap;