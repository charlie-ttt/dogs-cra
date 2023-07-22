import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import FuturaWoff2 from "./fonts/futura.woff2";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "Futura",
  },
  palette: {
    primary: {
      dark: "#E3960F",
      main: "#f3b64c",
      light: "#f1ac34",
      contrastText: "#171717",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    action: {
      disabledBackground: "#FDF0DB",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Futura';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Futura'), local('Futura-Regular'), url(${FuturaWoff2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected === true && {
            backgroundColor: "#f3b64c !important",
          }),
        }),
      },
    },
  },
});

export default theme;
