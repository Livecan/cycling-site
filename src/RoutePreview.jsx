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
    GpxObject.loadFromJson('../src/routes/Croissant_Loop.json')
      .then(routeObject => setRouteObject(routeObject));
  }, []);
  const theme = useTheme();

  return (
    <div className='route-preview'>
      <Typography variant="h2">
        Routes{routeObject != null && ` - ${routeObject.title}`}  {/* @todo Get this from the route name from data source */}
      </Typography>
      {routeObject == null ?
        'Loading...' :
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <RoutesList />
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={mapBoxStyle(theme)}>
                  <MapWrapper route={routeObject?.route != null ? routeObject.route : []} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RouteInfo
                    distance={routeObject.distance}
                    elevation={routeObject.elevation}
                    speedIndex={routeObject.speedIndex}
                    climbIndex={routeObject.climbIndex}
                    description={routeObject.description}
                    download={routeObject.gpx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ElevationChart dataSource={
                    routeObject.route.map(point => { return {arg: point.distance, val: point.ele} })
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