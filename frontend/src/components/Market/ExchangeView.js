import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ExchangesContext } from "./../../context/exchangesContext";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  cartBox: {
    padding: "0.3rem",
    width: "100%",
  },
  cartContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1rem",
    width: "75%",
    //border: "solid red 1px",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  cartTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  cartPaper: {
    height: "7rem",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      height: "5rem",
    },
  },
  cartItem: {
    ...theme.typography.text,
    height: "100%",
  },
  cartItem2: {
    ...theme.typography.text,
    textAlign: "center",
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
  },
  cartItem3: {
    ...theme.typography.text,
    height: "7rem",
    [theme.breakpoints.down("sm")]: {
      height: "5rem",
    },
  },
  cartItem4: {
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  cartItemPic: {
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
    height: "6.5rem",
    aspectRatio: "1",
    [theme.breakpoints.down("sm")]: {
      height: "4.5rem",
    },
  },
  cartItemLeft: {
    width: "75%",
    height: "7rem",
    [theme.breakpoints.down("sm")]: {
      height: "5rem",
    },
  },
//   cartItemRight: {
//     width: "25%",
//     height: "7rem",
//     [theme.breakpoints.down("sm")]: {
//       height: "5rem",
//     },
//   },
  cartIconButton: {
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1.3rem",
    },
  },
  cartIcon: {
    fontSize: "large",
    [theme.breakpoints.down("sm")]: {
      fontSize: "small",
    },
  },
  cartButton: {
    ...theme.typography.text,
    fontWeight: "bold",
    color: theme.palette.common.armyGreen,
  },
  exchangeSubTitle: {
    ...theme.typography.text,
    fontSize: "1.2rem",
    color: theme.palette.secondary.main,
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  cartEmptyText: {
    ...theme.typography.text,
    textAlign: "center",
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
    marginBottom: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginBottom: "0.5rem",
    },
  },
  cartVendor: {
    ...theme.typography.text,
    color: theme.palette.common.armyGreen,
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  cartProdName: {
    ...theme.typography.text,
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  cartPrice: {
    ...theme.typography.text,
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  exchangeTotal: {
    ...theme.typography.text,
    fontSize: "1rem",
    color: theme.palette.common.armyGreen,
    borderRadius: "12px",
    padding: "0.2rem",
  },
}));

const ExchangeView = () => {
  const classes = useStyles();
  const { exchanges } = useContext(ExchangesContext);
  //const exchangeItems = useSelector((state) => state.exchangeItems);
  //const dispatch = useDispatch();
  const [currentFarm] = useState("Zoey's Home Farm");
  console.log("ex", exchanges);

  // let exchangeInItems = exchangeItems.filter(
  //   (product) => product.vendor !== currentFarm
  // );
  // const exchangeInTotal = exchangeInItems
  //   .reduce((total, item) => {
  //     return (total += item.price * item.quantity);
  //   }, 0)
  //   .toFixed(2);

  // let exchangeOutItems = exchangeItems.filter(
  //   (product) => product.vendor === currentFarm
  // );
  // const exchangeOutTotal = exchangeOutItems
  //   .reduce((total, item) => {
  //     return (total += item.price * item.quantity);
  //   }, 0)
  //   .toFixed(2);

  // const isBalanced =
  //   Math.abs(exchangeInTotal - exchangeOutTotal) / exchangeOutTotal < 0.05 &&
  //   Math.abs(exchangeInTotal - exchangeOutTotal) / exchangeInTotal < 0.05;

  // async function handleSubmitRequest() {
  //   console.log("submiting request!!");
  //   setAdminMessage("Creating New Product...");

  //   try {
  //     const response = await fetch("http://localhost:8080/api/exchange/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         requestFrom: currentFarm,
  //         requestTo: exchangeInItems[0].vendor,
  //         exchangeInItems: exchangeInItems,
  //         exchangeOutItems: exchangeOutItems,
  //         messages: "test message",
  //         status: "submited"
  //       }),
  //     });
  //     const responseData = await response.json();
  //     console.log("from create res", responseData);
  //     if (response.ok) {
  //       dispatch({
  //         type: "exEMPTY",
  //       });
  //     }
  //     if (response.ok) {
  //       updateProducts();
  //       setAdminMessage("New Product Created!");
  //       setTimeout(() => {
  //         setAdminMessage("");
  //         setProductValues(initialProductValues);
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <Container>
      <Typography className={classes.cartTitle}>Exchange Requests</Typography>
      <Box className={classes.cartBox}>
        {exchanges.map((exchange, id) => (
          <Grid
            container
            key={exchange._id}
            direction="column"
            className={classes.cartContainer}
          >
            <Grid item className={classes.exchangeSubTitle}>
              Request From: {exchange.requestFrom} (Id# {exchange._id})
            </Grid>
            {exchange.exchangeOutItems
              //   .filter((product) => product.vendor !== currentFarm)
              .map((cartItem, i) => (
                <Paper key={cartItem.id} className={classes.cartPaper}>
                  <Grid item className={classes.cartItem}>
                    <Grid container justifyContent="space-between">
                      <Grid item className={classes.cartItemLeft}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item className={classes.cartItemPic}>
                            <Image src={cartItem.imgUrl} />
                          </Grid>
                          <Grid item className={classes.cartVendor}>
                            {cartItem.vendor}
                          </Grid>
                          <Grid item className={classes.cartProdName}>
                            {cartItem.name}
                          </Grid>
                          <Grid item className={classes.cartPrice}>
                            ${cartItem.price}/{cartItem.unit}
                          </Grid>
                          <Grid item className={classes.cartPrice}>
                            Qty: {cartItem.quantity}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

            <Grid item className={classes.exchangeSubTitle}>
              Request To Me: {exchange.requestTo} (Id# {exchange._id})
            </Grid>
            {exchange.exchangeInItems.map((cartItem, i) => (
              <Paper key={cartItem.id} className={classes.cartPaper}>
                <Grid item className={classes.cartItem}>
                  <Grid container justifyContent="space-between">
                    <Grid item className={classes.cartItemLeft}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item className={classes.cartItemPic}>
                          <Image src={cartItem.imgUrl} />
                        </Grid>
                        <Grid item className={classes.cartVendor}>
                          {cartItem.vendor}
                        </Grid>
                        <Grid item className={classes.cartProdName}>
                          {cartItem.name}
                        </Grid>
                        <Grid item className={classes.cartPrice}>
                          ${cartItem.price}/{cartItem.unit}
                        </Grid>
                        <Grid item className={classes.cartPrice}>
                          Qty: {cartItem.quantity}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Grid item className={classes.cartItem3}>
              {exchanges.length ? (
                <Grid
                  container
                  justifyContent="space-evenly"
                  spacing={2}
                  alignItems="center"
                  className={classes.cartItem4}
                >
                  {/* <Grid
                    item
                    className={classes.exchangeTotal}
                    style={
                      isBalanced
                        ? { border: "solid green 1px" }
                        : { border: "solid red 1px" }
                    }
                  >
                    Exchange In: {exchangeInTotal} VS Exchange Out:{" "}
                    {exchangeOutTotal}
                  </Grid> */}
                  {/* <Grid item className={classes.cartItem2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.cartButton}
                      disabled={!isBalanced}
                      onClick={handleSubmitRequest}
                    >
                      Submit Exchange Request
                    </Button>
                  </Grid> */}
                  {/* <Grid item className={classes.cartItem2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.cartButton}
                      component={Link}
                      to="/exchange"
                    >
                      Back To Exchange
                    </Button>
                  </Grid> */}
                </Grid>
              ) : (
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography className={classes.cartEmptyText}>
                      You Don't Have Exchange Requests...
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.cartButton}
                      component={Link}
                      to="/exchange"
                    >
                      Back To Exchange
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default ExchangeView;
