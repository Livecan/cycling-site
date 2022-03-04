import React, { useState } from "react";
import { Typography, Container, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RoutePreview from "./RoutePreview";
import TopBar from "./components/TopBar";
import MenuRoutes from "./data/MenuRoutes";
import DarkModeSwitch from "./components/DarkModeSwitch";

const defaultDarkTheme = false;
const themes = {
  light: createTheme({
    palette: {
      mode: "light"
    }
  }),
  dark: createTheme({
    palette: {
      mode: "dark"
    }
  }),
}

export default function App() {
  const [darkTheme, setDarkTheme] = useState(defaultDarkTheme);

  const theme = darkTheme ? themes.dark : themes.light;

  const switchTheme = (darkMode) => {
    setDarkTheme(darkMode);
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TopBar>
          <DarkModeSwitch onChange={switchTheme} default={defaultDarkTheme} />
        </TopBar>
        <Container maxWidth="lg">
          <CssBaseline />
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
