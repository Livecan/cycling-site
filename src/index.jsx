import React from "react";
import ReactDOM from 'react-dom';
import RoutePreview from "./RoutePreview";

function WelcomePage(props) {
  return (
    <RoutePreview />
  );
}

ReactDOM.render(<WelcomePage />, document.getElementById("app"));
