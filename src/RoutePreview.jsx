import React, { useEffect, useState } from 'react';
import MapWrapper from './MapWrapper';
import './RoutePreview.less';

async function loadGpxCoordinates(filename) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', filename);
    xhr.send();
    xhr.onload = function() {
      console.log(this);
      if (this.status == 200) {
        resolve(xhr.responseText);
      }
      else {
        reject(this);
      }
    };
  });
}

export default function RoutePreview(props) {
  const [gpxCoordinates, setGpxCoordinates] = useState(null);

  useEffect(() => {
    loadGpxCoordinates('../src/Evening_Ride.gpx')
      .then(parsedGpx => setGpxCoordinates(parsedGpx));
  }, []);

  return (
    <div className='route-preview'>
      {gpxCoordinates == null ?
        'Loading...' :
        'Loaded.' /*gpxCoordinates.toString()*/
      }
      <div className='map'>
        <MapWrapper />
      </div>
    </div>
  );
}