import React from "react";
import GoogleMapReact from 'google-map-react';

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
      <div>Map</div>
      {true ? //useEmptyMap?
        <svg style={{width: '100%', height: '100%'}}>
          <rect style={{width: '100%', height: '100%', fill:'rgb(127,127,256)', strokeWidth: 3, stroke: 'rgb(0,0,0)'}} />
        </svg> :
        <GoogleMapReact bootstrapURLKeys={{key:"AIzaSyCpRsorz1KlEvrRh-EeWD5P7qNYPuXF-kE"}}
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
