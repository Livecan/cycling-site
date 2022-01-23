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

export default function RoutePreview() {
  const theme = useTheme();

  const [routesList, setRoutesList] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    GpxObject.loadRoutesList()
      .then(routesList => {
        setRoutesList(routesList);
        selectRoute(routesList.find(defaultRoute => defaultRoute.isDefault))
      });
  }, []);

  const [route, setRoute] = useState([]);

  function selectRoute (route) {
    setSelectedRoute(route);
    route.getRoute().then(route => setRoute(route));
  }

  return (
    <div className='route-preview'>
      <Typography variant="h2">
        Routes{selectedRoute != null && ` - ${selectedRoute.title}`}  {/* @todo Get this from the route name from data source */}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <RoutesList routesList={routesList} onSelectRoute={selectRoute} />
          </Grid>
          {selectedRoute == null ?
            'Loading...' :  /* @todo: Make some fancier loader */
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={mapBoxStyle(theme)}>
                  <MapWrapper route={route} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RouteInfo
                    distance={selectedRoute.distance}
                    elevation={selectedRoute.elevationGain}
                    speedIndex={selectedRoute.speedIndex}
                    climbIndex={selectedRoute.climbIndex}
                    description={selectedRoute.description}
                    download={selectedRoute.gpx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ElevationChart dataSource={route.map(point => { return {arg: point.distance, val: point.ele} })} />
                </Grid>
              </Grid>
            </Grid>
          }
        </Grid>
      </Box>
    </div>
  );
}