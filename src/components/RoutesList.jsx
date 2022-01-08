import React from "react";
import { Divider, Stack } from '@mui/material';
import RouteCard from "./RouteCard";

export default function RoutesList() {
  // @todo Generate stack list of routes from a data source
  return (
    <Stack divider={<Divider light variant="middle" />}>
      <RouteCard title="Route 0" />
      <RouteCard title="Route 1" />
      <RouteCard title="Route df" />
    </Stack>
  );
};
