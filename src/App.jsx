import React from "react";
import { Typography, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RoutePreview from "./RoutePreview";
import TopBar from "./TopBar";

export default function App() {
  return (
    <React.Fragment>
      <TopBar />
      <Container maxWidth="lg">
        <Routes>
          <Route exact path="/" element={<Typography variant="body1">Home</Typography>} />
          <Route path="/routes" element={<RoutePreview />} />
          <Route path="/ready-for-rwanda" element={<Typography variant="body1">Ready for Rwanda</Typography>} />
        </Routes>
      </Container>

    </React.Fragment>
  );
}
