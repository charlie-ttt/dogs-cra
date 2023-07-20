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
import { onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import signOut from "../../firebase/auth/signout";
import { auth } from "../../firebase/config";

const drawerWidth = 240;

const routes = [
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
    label: "Sign Up",
    path: "/signup",
  },
  {
    id: 2,
    label: "Sign In",
    path: "/signin",
  },
];

const isActiveRoute = (routeName: string, currentRoute: string) => {
  return routeName === currentRoute;
};

export default function NavigationBar(props: React.PropsWithChildren) {
  const [userEmail, setUserEmail] = React.useState<string>("");

  let location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
      } else {
        setUserEmail("");
      }
    });
  }, [location.pathname]);

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
          {routes.map(({ label, path }) => (
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
        {userEmail && (
          <List>
            <MenuItem disabled>
              <ListItem key={0}>
                <ListItemText primary={userEmail} />
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
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 10 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
