import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
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
