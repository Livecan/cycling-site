import React from "react";
import ReactDOM from 'react-dom';
import gpxFile from './Evening_Ride.gpx'
import RoutePreview from "./RoutePreview";

function WelcomePage(props) {
  return (
    <RoutePreview />
  );
}

ReactDOM.render(<WelcomePage />, document.getElementById("root"));
console.log(gpxFile);

