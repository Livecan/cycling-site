import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { MdOutlineFileDownload } from 'react-icons/md';

const lineBoxStyle = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}

export default function RouteInfo(props) {
  const simpleData = [
    {label: 'Distance', value: `${props.distance.toFixed(2)} km`},
    {label: 'Speed', value: props.speedIndex},
    {label: 'Climb', value: props.climbIndex},
    {label: 'Elevation gain', value: `${props.elevation.toFixed(0)} m`}
  ];

  return (
    <Stack divider={<Divider />}>
      {simpleData.map(info =>
        <Box key={info.label} sx={lineBoxStyle}>
          <Typography variant="body1">{info.label}</Typography>
          <Typography variant="body1">{info.value}</Typography>
        </Box>
      )}
      <Box sx={lineBoxStyle}>
        <Typography variant="body1">Download GPX</Typography>
        <Link href={props.download}>
          <MdOutlineFileDownload />
        </Link>

      </Box>
      <Typography variant="body1">Description:</Typography>
      <Typography variant="body1">{props.description}</Typography>
    </Stack>
  )
}
