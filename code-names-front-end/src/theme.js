import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#3d3f40",
      main: "#3d3f40",
      dark: "#3d3f40",
    },
    secondary: {
      light: "#2c88b3",
      main: "#2c88b3",
      dark: "#2c88b3",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat"
    ],
  },
});

export default responsiveFontSizes(myTheme);