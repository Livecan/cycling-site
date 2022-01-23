import React from "react";
import { Box, Typography, Card } from '@mui/material';
import { GiMountainCave, GiSpeedometer } from 'react-icons/gi';

export default function RouteCard(props) {
  return (
    <Card>
      {/* @todo: move onHover bgColor into theme! */}
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', '&:hover': {background: 'lightblue' }}} onClick={props.onClick}>
        <Typography variant="h6" align="left">{props.title}</Typography>
        <Box>
          <Typography variant="body2" align="right">{props.distance} km</Typography>
          <Typography variant="body2" align="right">{props.elevationGain} m</Typography>
        </Box>
      </Box>
    </Card>
  );
}
