import React from "react";
import { Box, Typography, Card } from '@mui/material';

export default function RouteCard(props) {
  return (
    <Card>
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography variant="h6" align="left">{props.title}</Typography>
      <Box>
        <Typography variant="body2" align="right">13.18 km</Typography>
        <Typography variant="body2" align="right">2/5</Typography>
      </Box>
    </Box>
  </Card>
  );
}
