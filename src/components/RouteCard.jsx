import React from "react";
import { Box, Typography, Card } from '@mui/material';
import { GiMountainCave, GiSpeedometer } from 'react-icons/gi';
import { useTheme } from "@emotion/react";

export default function RouteCard(props) {
  const theme = useTheme();

  return (
    <Card>
      {/* @todo: move onHover bgColor into theme! */}
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', background: (props.isSelected && theme.palette.selectableCard.selected), '&:hover': {background: theme.palette.selectableCard.onHover }}} onClick={props.onClick}>
        <Typography variant="h6" align="left">{props.title}</Typography>
        <Box>
          <Typography variant="body2" align="right">{props.distance} km</Typography>
          <Typography variant="body2" align="right">{props.elevationGain} m</Typography>
        </Box>
      </Box>
    </Card>
  );
}
