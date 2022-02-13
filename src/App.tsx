import React from "react";
import { Typography, Container, useTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RoutePreview from "./RoutePreview";
import TopBar from "./TopBar";
import MenuRoutes from "./data/MenuRoutes";

export default function App() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TopBar />
        <Container maxWidth="lg">
          <Routes>
            <Route index element={<Typography variant="body1">Home</Typography>} />
            <Route path={MenuRoutes.routes.route} element={<RoutePreview />} />
            <Route path={MenuRoutes.ready.route} element={<Typography variant="body1">Ready for Rwanda</Typography>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
