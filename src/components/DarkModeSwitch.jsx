import React, { useState } from "react"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Switch } from "@mui/material";

export default function DarkModeSwitch(props) {
  const [checked, setChecked] = useState(props.default);

  const toggleLightMode = () => {
    props.onChange(!checked);
    setChecked(checked => !checked);
  }

  return (
    <React.Fragment>
      <LightModeIcon />
      <Switch checked={checked} onChange={toggleLightMode} />
      <DarkModeIcon />
    </React.Fragment>
  )
}
