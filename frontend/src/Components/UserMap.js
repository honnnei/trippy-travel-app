import React from 'react';
// import { Button } from 'react-bootstrap'

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow"


// {/* <script src="https://www.amcharts.com/lib/4/core.js"></script>
// <script src="https://www.amcharts.com/lib/4/maps.js"></script>
// <script src="https://www.amcharts.com/lib/4/geodata/worldLow.js"></script>
//         */}
// function UserMap() {
    
//     let myCountries = ["GB", "FR", "ES", "IT", "GR", "TR", "BA", "HR", "US", "CA"]
// //  <script src="https://www.amcharts.com/lib/4/core.js"></script>
// // <script src="https://www.amcharts.com/lib/4/maps.js"></script>
// // <script src="https://www.amcharts.com/lib/4/geodata/worldLow.js"></script>
        
function UserMap() {
    
//    let myCountries = ["GB", "FR", "ES", "IT", "GR", "TR", "BA", "HR", "US", "CA"]

//   // Create map instance
//   var chart = am4core.create("chartdiv", am4maps.MapChart);

//   // Set map definition
//   chart.geodata = am4geodataWorldLow;
  
//   // Set projection
//   chart.projection = new am4maps.projections.Miller();
  
//   // Create map polygon series
//   var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  
//   // Make map load polygon (like country names) data from GeoJSON
//   polygonSeries.useGeodata = true;
  
//   // Configure series
//   var polygonTemplate = polygonSeries.mapPolygons.template;
//   polygonTemplate.tooltipText = "{name}";
//   polygonTemplate.fill = am4core.color("#666666");
//   polygonTemplate.stroke = am4core.color("#333333");
//   polygonTemplate.propertyFields.fill = "color";

//   // Create hover state and set alternative fill color
//   var hs = polygonTemplate.states.create("hover");
//   hs.properties.fill = am4core.color("#888888");

//   // Create active state
//   var activeState = polygonTemplate.states.create("active");
//   activeState.properties.fill = am4core.color("#7EA2D6")

//   polygonTemplate.events.on("ready", function(ev) {
//       myCountries.forEach(id => {
//           polygonSeries.getPolygonById(id).isActive = true;
//       })
//   });

//   polygonTemplate.events.on("hit", function(ev) {
//       var data = ev.target.dataItem.dataContext;
//       const index = myCountries.indexOf(data.id)
//       index === -1 ? myCountries.push(data.id) : myCountries.splice(index, 1);
//       ev.target.isActive = !ev.target.isActive;
//       myCountries.forEach(id => {
//           polygonSeries.getPolygonById(id).isActive = true;
//       })
//   });
 
//   // Remove Antarctica
//   polygonSeries.exclude = ["AQ"];
  
//   // Add zoom control
//   chart.zoomControl = new am4maps.ZoomControl();

    return (
      <div className="user-map">
           <div id="chartdiv">
               <h1>this is map</h1>
           </div>
      </div>
    );
}

export default UserMap;