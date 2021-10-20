import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import { IsExchangingContext } from "./../../context/isExchangingContext";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  productsBox: {
    padding: "0.5rem",
    width: "98%",
  },
  productsContainer: {
    width: "100%",
  },
  topContainer: {
    height: "3rem",
  },
  shopTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  exchangeTotal: {
    ...theme.typography.text,
    fontSize: "1rem",
    color: theme.palette.common.armyGreen,
    //marginLeft: "1rem",
    //border: "solid green 1px",
    borderRadius: "12px",
    padding: "0.2rem",
  },
}));

export default function Exchange() {
  const classes = useStyles();
  const { isExchanging, updateIsExchanging } = useContext(IsExchangingContext);
  const exchangeItems = useSelector((state) => state.exchangeItems);
  const [currentFarm] = useState("Zoey's Home Farm");
  //console.log('ex items', exchangeItems);
  useEffect(() => {
    updateIsExchanging(true);
  });

  const exchangeInItems = exchangeItems.filter(
    (product) => product.vendor !== currentFarm
  );
  const exchangeInTotal = exchangeInItems
    .reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0)
    .toFixed(2);

  const exchangeOutItems = exchangeItems.filter(
    (product) => product.vendor === currentFarm
  );
  const exchangeOutTotal = exchangeOutItems
    .reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0)
    .toFixed(2);

  //console.log("ck1", (exchangeInTotal - exchangeOutTotal) / exchangeOutTotal);
  //console.log("ck2", (exchangeInTotal - exchangeOutTotal) / exchangeInTotal);

  const isBalanced =
    Math.abs(exchangeInTotal - exchangeOutTotal) / exchangeOutTotal < 0.05 &&
    Math.abs(exchangeInTotal - exchangeOutTotal) / exchangeInTotal < 0.05;

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className={classes.topContainer}
      >
        <Grid item className={classes.shopTitle}>
          Exchange Products
        </Grid>
        <Grid
          item
          className={classes.exchangeTotal}
          style={
            isBalanced
              ? { border: "solid green 1px" }
              : { border: "solid red 1px" }
          }
        >
          Exchange In: {exchangeInTotal} VS Exchange Out: {exchangeOutTotal}
        </Grid>
      </Grid>
      <Box className={classes.productsBox}>
        <Products className={classes.productsContainer} />
      </Box>
    </Container>
  );
}
