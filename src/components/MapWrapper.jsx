import React, { useMemo } from "react";
import GoogleMapReact from 'google-map-react';
import config from '../config.json';

function getDrawRoute(path) {
  return function drawRoute(map, maps) {
    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: path,
      geodesic: false,
      strokeColor: 'red',
      strokeOpacity: 0.7,
      strokeWeight: 3
    });

    nonGeodesicPolyline.setMap(map);

    new maps.Marker({
      position: path[0],
      label: 'A',
      map: map
    });

    new maps.Marker({
      position: path[path.length - 1],
      label: 'B',
      map: map
    });

    let bounds = new google.maps.LatLngBounds();
    for (let point of path) {
      bounds.extend(point);
    }
    map.fitBounds(bounds);
  }
}

export default function MapWrapper(props) {

  const path = props.route.map((point) =>
    { return {lat: point.lat, lng: point.lon} }
  );

  return (
    <React.Fragment>
      {/* @todo Hide API key */}
      <GoogleMapReact bootstrapURLKeys={{key: config.maps["google-api-key"]}}
          defaultCenter={{
            lat: -1.955,
            lng: 30.086
          }}
          defaultZoom={9}
          onGoogleApiLoaded={({map, maps}) => getDrawRoute(path)(map, maps)}
      >
      </GoogleMapReact>
    </React.Fragment>
  );
}
