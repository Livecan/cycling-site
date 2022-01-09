import React from "react";
import { Box, Typography, Card } from '@mui/material';
import { GiMountainCave, GiSpeedometer } from 'react-icons/gi';

export default function RouteCard(props) {
  return (
    <Card>
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography variant="h6" align="left">{props.title}</Typography>
      <Box>
        <Typography variant="body2" align="right">{props.distance} km</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: "2px"}}>
          <GiSpeedometer />
          <Typography variant="body2" align="right">{props.speed}</Typography>
          <GiMountainCave />
          <Typography variant="body2" align="right">{props.climb}</Typography>
        </Box>
      </Box>
    </Box>
  </Card>
  );
}
