import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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
            <MenuItem
              key={label}
              selected={isActiveRoute(path, location?.pathname)}
            >
              <ListItem key={label}>
                <ListItemButton onClick={() => navigate(path)}>
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
                <ListItemButton>
                  <ListItemText primary={user.email} />
                </ListItemButton>
              </ListItem>
            </MenuItem>
            <MenuItem>
              <ListItem key={1}>
                <ListItemButton
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
        label: "All Dog Breeds",
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

const HeartSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 7.21187L10.6662 6.01806C9.95717 5.38348 9.02575 5 8 5C5.79086 5 4 6.79086 4 9C4 11.9996 5.33975 14.212 7.03224 15.8501C8.75438 17.5169 10.7798 18.5183 11.8857 18.9794C11.9626 19.0114 12.0374 19.0114 12.1143 18.9794C13.2202 18.5183 15.2456 17.5169 16.9678 15.8501C18.6602 14.2119 20 11.9996 20 9.00004C20 6.7909 18.2091 5 16 5C14.9742 5 14.0428 5.38348 13.3338 6.01806L12 7.21187ZM12 4.52779C10.9385 3.57771 9.53671 3 8 3C4.68629 3 2 5.68629 2 9C2 16.3511 8.67146 19.8061 11.116 20.8254C11.6855 21.0628 12.3145 21.0628 12.884 20.8254C15.3285 19.8061 22 16.3512 22 9.00005C22 5.68634 19.3137 3 16 3C14.4633 3 13.0615 3.57771 12 4.52779Z"
      fill={"#171717"}
    />
  </svg>
);
