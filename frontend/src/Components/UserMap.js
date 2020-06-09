import React from 'react';
import { Button } from 'react-bootstrap'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow"


class UserMap extends React.Component {

  
componentDidMount(){
  // Default data
  let myCountries = ["GB", "FR", "ES", "IT", "GR", "TR", "BA", "HR", "US", "CA"]

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
  polygonTemplate.fill = am4core.color("#666666");
  polygonTemplate.stroke = am4core.color("#333333");
  polygonTemplate.propertyFields.fill = "color";

  // Create hover state and set alternative fill color
  let hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#888888");

  // Create active state
  let activeState = polygonTemplate.states.create("active");
  activeState.properties.fill = am4core.color("#7EA2D6")

  polygonTemplate.events.on("ready", function(ev) {
      myCountries.forEach(id => {
          polygonSeries.getPolygonById(id).isActive = true;
      })
  });

  //Set active state when clicked, pushes to myCountries array
//   polygonTemplate.events.on("hit", function(ev) {
//       let data = ev.target.dataItem.dataContext;
//       const index = myCountries.indexOf(data.id)
//       index === -1 ? myCountries.push(data.id) : myCountries.splice(index, 1);
//       ev.target.isActive = !ev.target.isActive;
//       myCountries.forEach(id => {
//           polygonSeries.getPolygonById(id).isActive = true;
//       })
//   });
 
  // Remove Antarctica
  polygonSeries.exclude = ["AQ"];
  
  // Add zoom control
  chart.zoomControl = new am4maps.ZoomControl();
  }
  render(){
    return (
      <div className="user-map">
               <h1>Map</h1>

           <div id="chartdiv" style={{backgroundColor: "grey", height: "600px"}}>
           </div>
      </div>
    );
}
}
export default UserMap;