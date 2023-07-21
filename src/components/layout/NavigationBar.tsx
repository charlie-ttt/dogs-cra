import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../firebase/auth/AuthContext";
import signOut from "../../firebase/auth/signout";

const drawerWidth = 240;

const isActiveRoute = (routeName: string, currentRoute: string) => {
  return routeName === currentRoute;
};

export default function NavigationBar(props: React.PropsWithChildren) {
  const user = useAuthContext();
  let location = useLocation();
  const navigate = useNavigate();

  const activeRoutes = getActiveRoutes(user !== null);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dogs App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {activeRoutes.map(({ label, path }) => (
            <MenuItem selected={isActiveRoute(path, location?.pathname)}>
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            </MenuItem>
          ))}
        </List>
        <Divider />
        {user && (
          <List>
            <MenuItem disabled>
              <ListItem key={0}>
                <ListItemText primary={user.email} />
              </ListItem>
            </MenuItem>
            <MenuItem>
              <ListItem key={1}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    signOut();
                    navigate("/signin");
                  }}
                >
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </MenuItem>
          </List>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: 5,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function getActiveRoutes(loggedIn: boolean) {
  if (loggedIn) {
    return [
      {
        id: 1,
        label: "All Dogs",
        path: "/",
      },
      {
        id: 2,
        label: "View Feed",
        path: "/feed",
      },
      {
        id: 3,
        label: "My Liked Photos",
        path: "/my-liked-photos",
      },
    ];
  } else {
    return [
      {
        id: 1,
        label: "Sign Up",
        path: "/signup",
      },
      {
        id: 2,
        label: "Sign In",
        path: "/signin",
      },
    ];
  }
}
