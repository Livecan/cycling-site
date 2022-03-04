import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { useLinkClickHandler } from "react-router-dom";
import MenuRoutes from "../data/MenuRoutes";

export default function TopBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        {
          Object.values(MenuRoutes).map(menuItem =>
            <Button key={menuItem.route} onClick={useLinkClickHandler(menuItem.route)} sx={{ my: 2, color: 'white', display: 'block' }}>{menuItem.name}</Button>
          )
        }
        <Box sx={{flexGrow: 1}}></Box>
        {props.children}
      </Toolbar>
    </AppBar>
  );
}