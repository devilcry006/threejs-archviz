import {
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Slider,
  Switch,
} from "@mui/material";
import { ChangeEvent, Dispatch, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
// import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import LightModeIcon from "@mui/icons-material/LightMode";

interface PropsNavigationBar {
  // lightRotation: number;
  // setLightRotation: Dispatch<number>;
  lightIntensity: number;
  setLightIntensity: Dispatch<number>;
  visble: boolean;
  setVisible:Dispatch<boolean>;
}

function NavigationBar({
  // lightRotation,
  // setLightRotation,
  lightIntensity,
  setLightIntensity,
  visble,
  setVisible
}: PropsNavigationBar) {
  const [drawer, setDrawer] = useState<boolean>(false);

  const handleClose = () => setDrawer(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        zIndex: 9,
        position: "absolute",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div style={{ color: "black" }}>Archviz</div>
      <IconButton onClick={() => setDrawer(true)}>
        <SettingsIcon />
      </IconButton>
      <Drawer anchor="right" open={drawer} onClose={handleClose} hideBackdrop>
        <List sx={{ minWidth: "200px" }}>
          <ListItem>
            <ListItemIcon>
              <LightModeIcon />
            </ListItemIcon>
            <Slider
              min={0}
              max={100}
              value={lightIntensity * 100}
              onChange={(_, value) =>
                setLightIntensity((value as number) / 100)
              }
            />
          </ListItem>
          {/* <ListItem>
            <ListItemIcon>
              <ThreeSixtyIcon />
            </ListItemIcon>
            <Slider
              min={0}
              max={360}
              value={(lightRotation * 180) / Math.PI}
              onChange={(_, value) =>
                setLightRotation((value as number) * (Math.PI / 180))
              }
            />
          </ListItem> */}
          <ListItem>
            <FormControlLabel control={<Switch checked={visble} onChange={(event: ChangeEvent<HTMLInputElement>) => setVisible(event.target.checked)} />} label="Props" />
          </ListItem>

          <ListItemButton onClick={handleClose}>Exit</ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}

export default NavigationBar;
