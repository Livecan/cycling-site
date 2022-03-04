import React from "react";
import { Box, Typography, Card, Theme } from '@mui/material';

interface RouteCardProps {
  isSelected: boolean,
  onClick: VoidFunction,
  title: string,
  distance: number,
  elevationGain: number,
}

export default function RouteCard(props: RouteCardProps): JSX.Element {
  const routeCardBoxStyle = (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: "pointer",
    bgcolor: (props.isSelected && theme.palette.action.selected),
    '&:hover': {
      bgcolor: theme.palette.action.hover
    }
  }) as const;

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
