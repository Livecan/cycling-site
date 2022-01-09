import React, { useEffect, useMemo, useState } from 'react';
import { getHaversineDistance } from './helpers/gps';
import MapWrapper from './components/MapWrapper';
import GpxObject from './data/GpxObject.js';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import RoutesList from './components/RoutesList';
import ElevationChart from './components/ElevationChart';
import RouteInfo from './components/RouteInfo';

const mapBoxStyle = (theme) => {
  return {
    height: "200px",
    [theme.breakpoints.up('sm')]: {
      height: "350px"
    },
  }
}

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
  const displayData = [
    {label: 'Distance', value: `${distance.toFixed(2)} km`},
    // @todo: Calculate these from the file
    {label: 'Elevation gain', value: `220 m`},
    {label: 'Estimated time', value: `0:45`},
  ];

  useEffect(() => {
    // @todo: Get a file that would have reduced number of points and use Google roads for drawing route
    GpxObject.loadFromFile('../src/Evening_Ride.gpx')
      .then(parsedGpx => setGpxCoordinates(parsedGpx));
  }, []);

  const theme = useTheme();

  return (
    <div className='route-preview'>
      <Typography variant="h2">
        Routes - Route 0  {/* @todo Get this from the route name from data source */}
      </Typography>
      {gpxCoordinates == null ?
        'Loading...' :
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <RoutesList />
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={8} sx={mapBoxStyle(theme)}>
                  <MapWrapper route={gpxCoordinates != null ? gpxCoordinates : []} />
                </Grid>
                <Grid item xs={4}>
                  <RouteInfo distance={28.17} speed={3} elevation={220} description="Wednesday morning classic, all welcome, non-drop ride." />
                </Grid>
                <Grid item xs={12}>
                  <ElevationChart dataSource={
                    gpxCoordinates.map(point => { return {arg: point.distance, val: point.ele} })
                  } />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      }
    </div>
  );
}