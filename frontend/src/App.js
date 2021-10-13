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
import ContactUs from "./components/ContactUs";
import Footer from "./components/UI/Footer";
import ThankYou from "./components/Responses/ThankYou";
import Success from "./components/Responses/Success";
import Canceled from "./components/Responses/Canceled";
import Admin from "./components/Admin/Admin";
import { AuthContext } from "./context/authContext";
import { ProductsContext } from "./context/productsContext";

import { ThemeProvider } from "@material-ui/core/styles";
import myTheme from "./components/UI/Theme";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [productsState, setProductState] = useState([]);
  const [downloadAgain, setDownloadAgain] = useState(false);

  console.log('hi downloadAgain', downloadAgain);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
    console.log('haha download!!!');
  }, [downloadAgain]);

  async function fetchProducts() {
    console.log("fetch products!!");
    //setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/product/");
      const responseData = await response.json();
      console.log("download", responseData);
      setProductState(responseData);
      // if (!response.ok) {
      //   setErrorMessage(
      //     responseData.errorMessage
      //   );
      // }
      //setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      // setIsLoading(false);
      // setErrorMessage(
      //   error.message || "Something went wrong, please try again!"
      // );
    }
  }

  const signIn = useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  // const updateProducts = useCallback(() => {
  //   setDownloadAgain(downloadAgain+1);
  // }, []);

  const updateProducts = () => {setDownloadAgain(!downloadAgain)}

  let routes;

  if (!isSignedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={ShoppingCart} />
        {/* <Route exact path="/exchange" component={Exchange} /> */}
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/thankyou" component={ThankYou} />
        {/* <Route exact path="/success" component={Success} />
        <Route exact path="/canceled" component={Canceled} /> */}
        <Route exact path="/admin" component={Admin} />
        <Redirect to="/signin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/signin" component={Signin} /> */}
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/exchange" component={Exchange} />
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
      value={{ isSignedIn: isSignedIn, signIn: signIn, signOut: signOut }}
    >
      <ProductsContext.Provider value={{products: productsState, updateProducts: updateProducts}}>
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
