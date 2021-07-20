import { createMuiTheme } from '@material-ui/core/styles';
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';


const green = '#bada55'
const blue = '#7fe5f0'
const gray = '#696969'
const latte = '#fff9e3'

export default createMuiTheme({
  palette: {
    primary: {
      main: green,
    },
    secondary: {
      main: blue,
    },
    common: {
        gray: gray,
        latte: latte
    }
  },
  typography: {
    tab: {
      fontFamily: 'Playfair Display',
      fontSize: '1.5rem'
    }
  }
});


