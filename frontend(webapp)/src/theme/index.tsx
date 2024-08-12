import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D7A",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 13.25,
  },
  components: {
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
