import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./components/Home";
import CreateAccount from "./components/Auth/CreateAccount";
import Signin from "./components/Auth/SignIn";
import AboutUs from "./components/AboutUs";
import Shop from "./components/Market/Shop";
import ShoppingCart from "./components/Market/ShoppingCart";
import Exchange from "./components/Market/Exchange";
import ExchangePlatform from "./components/Market/ExchangePlatform";
import ExchangeView from "./components/Market/ExchangeView";
import ContactUs from "./components/ContactUs";
import Footer from "./components/UI/Footer";
import ThankYou from "./components/Responses/ThankYou";
import Success from "./components/Responses/Success";
import Canceled from "./components/Responses/Canceled";
import Admin from "./components/Admin/Admin";
import { AuthContext } from "./context/authContext";
import { ProductsContext } from "./context/productsContext";
import { IsExchangingContext } from "./context/isExchangingContext";
import { ExchangesContext } from "./context/exchangesContext";

import { ThemeProvider } from "@material-ui/core/styles";
import myTheme from "./components/UI/Theme";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  //user info
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [userFarm, setUserFarm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [productsState, setProductState] = useState([]);
  const [downloadAgain, setDownloadAgain] = useState(false);
  const [downloadExchangesAgain, setDownloadExchangesAgain] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);
  const [exchangesState, setExchangesState] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [downloadAgain]);

  useEffect(() => {
    fetchExchanges();
  }, [downloadExchangesAgain]);

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:8080/api/product/");
      const responseData = await response.json();
      setProductState(responseData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchExchanges() {
    try {
      const response = await fetch("http://localhost:8080/api/exchange/");
      const responseData = await response.json();
      setExchangesState(responseData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const signIn = useCallback((token, name, userId, userFarm, isAdmin) => {
    setUsername(name)
    setToken(token);
    setUserId(userId);
    setUserFarm(userFarm);
    setIsAdmin(isAdmin);
    fetchExchanges();
  }, []);

  const signOut = useCallback(() => {
    setUsername("");
    setToken(null);
    setUserId("");
    setUserFarm("");
    setIsAdmin(false);
  }, []);

  const updateProducts = () => {
    setDownloadAgain(!downloadAgain);
  };

  const updateExchanges = () => {
    setDownloadExchangesAgain(!downloadExchangesAgain);
  };

  const updateIsExchanging = (value) => {
    setIsExchanging(value);
  };

  let routes;

  if (!token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Redirect to="/signin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/exchange" component={Exchange} />
        <Route exact path="/exchangeplatform" component={ExchangePlatform} />
        <Route exact path="/exchangeview" component={ExchangeView} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/canceled" component={Canceled} />
        <Route exact path="/admin" component={Admin} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        signIn: signIn,
        signOut: signOut,
        username: username,
        userId: userId,
        currentFarm: userFarm,
        isAdmin: isAdmin,
        token: token,
      }}
    >
      <ProductsContext.Provider
        value={{ products: productsState, updateProducts: updateProducts }}
      >
        <IsExchangingContext.Provider
          value={{
            isExchanging: isExchanging,
            updateIsExchanging: updateIsExchanging,
          }}
        >
          <ExchangesContext.Provider
            value={{
              exchanges: exchangesState,
              updateExchanges: updateExchanges,
            }}
          >
            <ThemeProvider theme={myTheme}>
              <BrowserRouter>
                <Header
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
                {routes}
                {/* <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateAccount} />
            <Route exact path="/signin" component={Signin} />
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
          </Switch> */}
                <Footer
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </BrowserRouter>
            </ThemeProvider>
          </ExchangesContext.Provider>
        </IsExchangingContext.Provider>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

// const initialProducts = [
//   {
//     name: "Eggplant",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/eggplant.jpg",
//     vendor: "Max's Fun Farm",
//     price: 2.49,
//     quantity: 1,
//     id: "prod_KIZVKYt7mEFlXs",
//     unit: "lb",
//     priceId: "price_1JdyM9K6cEl29YLI8cAQy2ba",
//   },
//   {
//     name: "Tomato",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato1.jpg",
//     vendor: "Max's Fun Farm",
//     price: 1.99,
//     quantity: 1,
//     id: "prod_KIZXpQFS2KXTLF",
//     unit: "lb",
//     priceId: "price_1JdyOPK6cEl29YLI2XbwU17g",
//   },
//   {
//     name: "Sweet Potatoes",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato1.jpg",
//     vendor: "Zoey's Home Farm",
//     price: 1.99,
//     quantity: 1,
//     id: "prod_KIZlCQBo9qcg4g",
//     unit: "lb",
//     priceId: "price_1JdybXK6cEl29YLIGPJZQvgE",
//   },
//   {
//     name: "Cucumbers",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cucumber.jpg",
//     vendor: "Noah's Oak Farm",
//     price: 4.99,
//     quantity: 1,
//     id: "prod_KIhnyoYDtl7mQQ",
//     unit: "lb",
//     priceId: "price_1Je6NpK6cEl29YLIqaN9GqJP",
//   },
//   {
//     name: "Blueberry",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/blueberry.jpg",
//     vendor: "Summit Hill Farm",
//     price: 6.99,
//     quantity: 1,
//     id: "prod_KIhpoZrJX5pc3i",
//     unit: "pint",
//     priceId: "price_1Je6QAK6cEl29YLImZsu0Vtd",
//   },
//   {
//     name: "Lemon",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/lemon.jpg",
//     vendor: "Zoey's Home Farm",
//     price: 1.49,
//     quantity: 1,
//     id: "prod_KIhrSt2IQoEO1h",
//     unit: "lb",
//     priceId: "price_1Je6S8K6cEl29YLI8Ge1vqf5",
//   },
//   {
//     name: "Tomato",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato2.jpg",
//     vendor: "Noah's Oak Farm",
//     price: 2.49,
//     quantity: 1,
//     id: "prod_KIhtGGGLFNnbEd",
//     unit: "lb",
//     priceId: "price_1Je6UAK6cEl29YLIXypAan6x",
//   },
//   {
//     name: "Red Roses",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/rose.jpg",
//     vendor: "Madison Rose Farm",
//     price: 12.99,
//     quantity: 1,
//     id: "prod_KIhvdy2mEFyPfV",
//     unit: "dozen",
//     priceId: "price_1Je6VyK6cEl29YLI3EKPjMSV",
//   },
//   {
//     name: "Cherries",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cherry.jpg",
//     vendor: "Summit Hill Farm",
//     price: 6.99,
//     quantity: 1,
//     id: "prod_KIhycLZfoRUeaG",
//     unit: "lb",
//     priceId: "price_1Je6YIK6cEl29YLItpSbBPkA",
//   },
//   {
//     name: "Sugar Snap Peas",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/pea.jpg",
//     vendor: "Noah's Oak Farm",
//     price: 4.99,
//     quantity: 1,
//     id: "prod_KIZ00kDPjkKOjD",
//     unit: "lb",
//     priceId: "price_1JdxsLK6cEl29YLIIQayXiJ6",
//   },
//   {
//     name: "Yellow Potato",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/potato.jpg",
//     vendor: "Max's Fun Farm",
//     price: 1.49,
//     quantity: 1,
//     id: "prod_KIYzSQqj85s5Eq",
//     unit: "lb",
//     priceId: "price_1JdxrfK6cEl29YLIrOeB8c3d",
//   },
//   {
//     name: "Strawberries",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/strawberry.jpg",
//     vendor: "Morris Family Farm",
//     price: 4.99,
//     quantity: 1,
//     id: "prod_KIi0WlEUlpBWxA",
//     unit: "lb",
//     priceId: "price_1Je6aFK6cEl29YLIiYaCR7rb",
//   },
//   {
//     name: "Apple",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/apple.jpg",
//     vendor: "Morris Family Farm",
//     price: 2.99,
//     quantity: 1,
//     id: "prod_KIi1LhYQviAdtv",
//     unit: "lb",
//     priceId: "price_1Je6bsK6cEl29YLIX29h4ufw",
//   },
//   {
//     name: "Sweet Potatoes",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato2.jpg",
//     vendor: "Noah's Oak Farm",
//     price: 1.99,
//     quantity: 1,
//     id: "prod_KIi4vKVVxrRUCg",
//     unit: "lb",
//     priceId: "price_1Je6epK6cEl29YLIgE0m5BVS",
//   },
//   {
//     name: "Basil",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/basil.jpg",
//     vendor: "Zoey's Home Farm",
//     price: 4.99,
//     quantity: 1,
//     id: "prod_KIi661TSYHLq9N",
//     unit: "box",
//     priceId: "price_1Je6gVK6cEl29YLIeot4WTQ2",
//   },
// ];

// const vendorsList = [
//   {name: "Max's Fun Farm", farmId: "F001"},
//   {name: "Madison Rose Farm", farmId: "F002"},
//   {name: "Noah's Oak Farm", farmId: "F003"},
//   {name: "Zoey's Home Farm", farmId: "F004"},
//   {name: "Summit Hill Farm", farmId: "F005"},
//   {name: "Morris Family Farm", farmId: "F006"},
// ];
