import React from "react";
import Products from "./../Products";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  productsBox: {
    padding: "0.5rem",
    width: "98%",
  },
  productsContainer: {
    width: "100%",
  },
  shopTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
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