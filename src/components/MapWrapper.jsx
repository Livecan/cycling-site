import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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

window.initMap = () => {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
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
      <MapContainer style={{height: "100%", width: "100%", overflow: "hidden"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </React.Fragment>
  );
}
