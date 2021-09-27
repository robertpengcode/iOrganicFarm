import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Market from "./components/Market/Market";
import Shop from "./components/Market/Shop";
import ShoppingCart from "./components/ShoppingCart";
import Exchange from "./components/Market/Exchange";
import ContactUs from "./components/ContactUs";
import Footer from "./components/UI/Footer";
import ThankYou from "./components/ThankYou";
import Success from "./components/Success";
import Canceled from "./components/Canceled";

import { ThemeProvider } from "@material-ui/core/styles";
import myTheme from "./components/UI/Theme";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <Header
          tabValue={tabValue}
          setTabValue={setTabValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/market" component={Market} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/exchange" component={Exchange} />
          <Route exact path="/contact" component={ContactUs} />
          <Route exact path="/thankyou" component={ThankYou} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/canceled" component={Canceled} />
          <Redirect to="/" />
        </Switch>
        <Footer
          tabValue={tabValue}
          setTabValue={setTabValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
