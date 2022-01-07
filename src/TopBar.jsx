import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { useLinkClickHandler } from "react-router-dom";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
          <Button onClick={useLinkClickHandler("/")} sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
          <Button onClick={useLinkClickHandler("/routes")} sx={{ my: 2, color: 'white', display: 'block' }}>Routes</Button>
          <Button onClick={useLinkClickHandler("/ready-for-rwanda")} sx={{ my: 2, color: 'white', display: 'block' }}>Ready for Rwanda</Button>
      </Toolbar>
    </AppBar>
  );
}