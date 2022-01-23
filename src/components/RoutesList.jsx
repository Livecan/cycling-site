import React from "react";
import { Divider, Stack } from '@mui/material';
import RouteCard from "./RouteCard";

export default function RoutesList(props) {
  return (
    <Stack divider={<Divider light variant="middle" />}>
      {props.routesList.map(route =>
        <RouteCard key={route.gpx} title={route.title} distance={route.distance} elevationGain={route.elevationGain} onClick={() => props.onSelectRoute(route)} />
      )}
    </Stack>
  );
};
