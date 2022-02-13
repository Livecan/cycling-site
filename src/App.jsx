import React from "react";
import { Box, Typography, Container, useTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RoutePreview from "./RoutePreview";
import TopBar from "./TopBar";
import MenuRoutes from "./data/MenuRoutes";
import bgImage from "./pictures/bg0.jpg";

export default function App() {
  const theme = useTheme();

  return (
    <Box sx={{background: `url(${bgImage})`}}>
      <ThemeProvider theme={theme}>
        <TopBar />
        <Container maxWidth="lg">
          <Routes>
            <Route exact path={MenuRoutes.home.route} element={<Typography variant="body1">Home</Typography>} />
            <Route path={MenuRoutes.routes.route} element={<RoutePreview />} />
            <Route path={MenuRoutes.routes.ready} element={<Typography variant="body1">Ready for Rwanda</Typography>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
