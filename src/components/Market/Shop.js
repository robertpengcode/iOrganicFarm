import React, { useState, useEffect } from "react";
import Products from "./../Products";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  productsBox: {
    border: "solid green",
    padding: "0.3rem",
    width: "100%",
  },
  productsContainer: {
    border: "solid brown",
    width: "100%",
  },
  shopTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
  },
}));

export default function Shop() {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.shopTitle}>
        Shop Our Organic Products
      </Typography>
      <Box className={classes.productsBox}>
        <Products className={classes.productsContainer}/>
      </Box>
    </Container>
  );
}