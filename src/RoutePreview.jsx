import React, { useEffect, useMemo, useState } from 'react';
import { getHaversineDistance } from './helpers/gps';
import MapWrapper from './MapWrapper';
import GpxObject from './data/GpxObject.js';
import { Box, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';

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
      <Typography variant="h2">
        Route Preview
      </Typography>
      {gpxCoordinates == null ?
        'Loading...' :
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className='map'>
                <MapWrapper route={gpxCoordinates != null ? gpxCoordinates : []} />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack>
                <Paper>
                  Distance
                  <TextField disabled value={`${distance.toFixed(2)} km`} />
                </Paper>
                <Divider />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      }
    </div>
  );
}