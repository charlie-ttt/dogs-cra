import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "./components/layout/NavigationBar";
import { AuthContextProvider } from "./firebase/auth/AuthContext";
import Feed from "./pages/Feed";
import Main from "./pages/Main";
import MyLikedPhotos from "./pages/MyLikedPhotos";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Router>
      <AuthContextProvider>
        <NavigationBar>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/my-liked-photos" element={<MyLikedPhotos />} />
          </Routes>
        </NavigationBar>
      </AuthContextProvider>
    </Router>
  </ThemeProvider>
);
