import React from "react";
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from "@emotion/react";

export default function RouteCard(props) {
  const theme = useTheme();

  const routeCardBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bgcolor: (props.isSelected && 'action.selected'),
    '&:hover': {
      bgcolor: 'action.hover'
    }
  };

  return (
    <Card>
      <Box sx={routeCardBoxStyle} onClick={props.onClick}>
        <Typography variant="h6" align="left">{props.title}</Typography>
        <Box>
          <Typography variant="body2" align="right">{props.distance} km</Typography>
          <Typography variant="body2" align="right">{props.elevationGain} m</Typography>
        </Box>
      </Box>
    </Card>
  );
}
