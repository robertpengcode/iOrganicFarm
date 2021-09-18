import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cartBox: {
    border: "solid green",
    padding: "0.3rem",
    width: "100%",
  },
  cartContainer: {
    border: "solid brown",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  cartTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
  },
  cartItem: {
    ...theme.typography.text,
    border: "solid blue",
    height: "5rem",
  },
  cartItem2: {
    ...theme.typography.text,
    border: "solid red",
    height: "2rem",
  },
}));

const cartItems = [
    {
        name: 'Tomato',
        vendor: "Max's farm",
        price: 1,
    },
    {
        name: 'Sweet potato',
        vendor: "Zoey's home farm",
        price: 2,
    },
    {
        name: 'Eggplant',
        vendor: "Max's farm",
        price: 3,
    },
]

const ShoppingCart = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography className={classes.cartTitle}>Shopping Cart</Typography>
      <Box className={classes.cartBox}>
        <Grid container direction="column" className={classes.cartContainer}>
            {cartItems.map((cartItem) => (
          <Grid item className={classes.cartItem}>
            <Grid container>
                <Grid item >{cartItem.name}</Grid><Grid item>{cartItem.vendor}</Grid><Grid item>{cartItem.price}</Grid>
            </Grid>
          </Grid>))
            }
          
          <Grid item className={classes.cartItem}>
            <Grid container direction="column">
                <Grid item className={classes.cartItem2}><Typography>Total $</Typography></Grid>
                <Grid item className={classes.cartItem2}><Button>Check Out</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ShoppingCart;
