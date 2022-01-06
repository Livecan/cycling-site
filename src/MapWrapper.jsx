import React from "react";
import GoogleMapReact from 'google-map-react';
import * as config from './config.json';

export default function MapWrapper(props) {

  function renderPolylines(map, maps) {
    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path:
        props.route.map((point) =>
          { return {lat: point.lat, lng: point.lon} }
        ),
      geodesic: false,
      strokeColor: 'red',
      strokeOpacity: 0.7,
      strokeWeight: 3
    });
    nonGeodesicPolyline.setMap(map);
  }

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
            defaultZoom={13}
            onGoogleApiLoaded={({map, maps}) => renderPolylines(map, maps)} />
      }
    </React.Fragment>
  );
}
