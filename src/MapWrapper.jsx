import React, { useMemo } from "react";
import GoogleMapReact from 'google-map-react';
import config from './config.json';

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

    let bounds = new google.maps.LatLngBounds();
    for (let point of path) {
      bounds.extend(point);
    }
    map.fitBounds(bounds);
  }
}

export default function MapWrapper(props) {

  const path = useMemo(
    () => props.route.map((point) =>
      { return {lat: point.lat, lng: point.lon} }
    ),
    [props.route]
  );

  return (
    <React.Fragment>
      {false ? //useEmptyMap?
        <svg style={{width: '100%', height: '100%'}}>
          <rect style={{width: '100%', height: '100%', fill:'rgb(127,127,256)', strokeWidth: 3, stroke: 'rgb(0,0,0)'}} />
        </svg> :
        // @todo Hide API key
        <GoogleMapReact bootstrapURLKeys={{key: config.maps["google-api-key"]}}
            defaultCenter={{
              lat: -1.955,
              lng: 30.086
            }}
            defaultZoom={9}
            onGoogleApiLoaded={({map, maps}) => getDrawRoute(path)(map, maps)}
            />
      }
    </React.Fragment>
  );
}
