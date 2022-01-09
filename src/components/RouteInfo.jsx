import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";


export default function RouteInfo(props) {

  const simpleData = [
    {label: 'Distance', value: `${props.distance.toFixed(2)} km`},
    {label: 'Speed', value: props.speed},
    {label: 'Elevation gain', value: `${props.elevation} m`}
  ];

  return (
    <Stack divider={<Divider />}>
      {simpleData.map(info =>
        <Box key={info.label} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography variant="body1" align="left">{info.label}</Typography>
          <Typography variant="body1" align="right">{info.value}</Typography>
        </Box>
      )}
      <Typography variant="body1">Description:</Typography>
      <Typography variant="body1">{props.description}</Typography>
    </Stack>
  )
}
