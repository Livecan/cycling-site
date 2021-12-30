import React, { useEffect, useMemo, useState } from 'react';
import { getHaversineDistance } from './helpers/gps';
import MapWrapper from './MapWrapper';
import GpxObject from './data/GpxObject.js';
import './RoutePreview.less';

export default function RoutePreview(props) {
  const [gpxCoordinates, setGpxCoordinates] = useState([]);

  const distance = useMemo(
    () => {
      let cummulativeDistance = 0;
      for (let i = 1; i < gpxCoordinates.length; i++) {
        cummulativeDistance += getHaversineDistance(
          gpxCoordinates[i - 1].lat,
          gpxCoordinates[i - 1].lon,
          gpxCoordinates[i].lat,
          gpxCoordinates[i].lon
        );
      }
      return cummulativeDistance;
    },
    [gpxCoordinates]
  );

  useEffect(() => {
    GpxObject.loadFromFile('../src/Evening_Ride.gpx')
      .then(parsedGpx => setGpxCoordinates(parsedGpx));
  }, []);

  return (
    <div className='route-preview'>
      <h2>Route Preview</h2>
      {gpxCoordinates == null ?
        'Loading...' :
        <div className="route-preview--grid">
          <div className='map'>
            <MapWrapper route={gpxCoordinates != null ? gpxCoordinates : []} />
          </div>
          <div className='info'>
            <table>
              <tbody>
                <tr>
                  <td>Distance:</td>
                  <td>{distance.toFixed(2)} km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
}