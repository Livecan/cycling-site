import React, { useEffect, useState } from 'react';
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
  const [routeObject, setRouteObject] = useState(null);

  useEffect(() => {
    // @todo: Get a file that would have reduced number of points and use Google roads for drawing route
    GpxObject.loadFromFile('../src/Croissant_Loop.gpx')
      .then(routeObject => setRouteObject(routeObject));
  }, []);

  const theme = useTheme();

  return (
    <div className='route-preview'>
      <Typography variant="h2">
        Routes - Route 0  {/* @todo Get this from the route name from data source */}
      </Typography>
      {routeObject == null ?
        'Loading...' :
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <RoutesList />
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={8} sx={mapBoxStyle(theme)}>
                  <MapWrapper route={routeObject?.path != null ? routeObject.path : []} />
                </Grid>
                <Grid item xs={4}>
                  <RouteInfo distance={routeObject.distance} speed={3} elevation={220} description="Wednesday morning classic, all welcome, non-drop ride." />
                </Grid>
                <Grid item xs={12}>
                  <ElevationChart dataSource={
                    routeObject.path.map(point => { return {arg: point.distance, val: point.ele} })
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