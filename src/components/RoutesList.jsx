import React from "react";
import { Divider, Stack } from '@mui/material';
import RouteCard from "./RouteCard";

export default function RoutesList() {
  const routesData = [
    {
      title: 'Route 0',
      id: 'route-0',
      distance: 30.12,
      speed: 3,
      climb: 2
    },
    {
      title: 'Route 1',
      id: 'route-1',
      distance: 15.25,
      speed: 5,
      climb: 1
    },
    {
      title: 'Route 2',
      id: 'route-2',
      distance: 50.85,
      speed: 1,
      climb: 5
    },
  ];

  // @todo Generate stack list of routes from a data source
  return (
    <Stack divider={<Divider light variant="middle" />}>
      {routesData.map(({id, title, distance, speed, climb}) =>
        <RouteCard key={id} id={id} title={title} distance={distance} speed={speed} climb={climb} />
      )}
    </Stack>
  );
};
