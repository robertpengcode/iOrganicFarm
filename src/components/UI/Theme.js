import { createTheme } from "@material-ui/core/styles";
//import { brown } from "@material-ui/core/colors";

const green = "#bada55";
const blue = "#7fe5f0";
const gray = "#696969";
const latte = "#fff9e3";
const armyGreen ="#454B1B";
const brown ="#4b3621";

export default createTheme({
  palette: {
    primary: {
      main: green
    },
    secondary: {
      main: brown
    },
    common: {
      gray: gray,
      latte: latte,
      brown: brown,
      blue: blue,
      armyGreen: armyGreen
    }
  },
  typography: {
    tab: {
      fontFamily: "Playfair Display",
      fontSize: "1.5rem"
    },
    footer: {
      fontFamily: "Playfair Display",
      width: "100%"
    },
    text: {
      fontFamily: "Playfair Display",
    }
  }
});
