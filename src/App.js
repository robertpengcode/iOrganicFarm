import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Market from './components/Market/Market';
import Shop from './components/Market/Shop';
import Exchange from './components/Market/Exchange';
import ContactUs from './components/ContactUs';

import { ThemeProvider } from '@material-ui/core/styles';
import myTheme from './components/UI/Theme';

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route exact path='/about' component = {AboutUs} />
          <Route exact path='/market' component = {Market} />
          <Route exact path='/shop' component = {Shop} />
          <Route exact path='/exchange' component = {Exchange} />
          <Route exact path='/contact' component = {ContactUs} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
