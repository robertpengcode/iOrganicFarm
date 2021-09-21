import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import Image from "material-ui-image";

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
    width: "20%",
    textAlign: "center",
  },
  cartItemPic: {
    height: "5rem",
    aspectRatio: "1",
    border: "dotted purple",
  },
  cartItemLeft: {
    width: "60%",
    border: "solid yellow",
  },
  cartItemRight: {
    width: "30%",
    border: "solid yellow",
  },
  cartCheckOutButton: {
    ...theme.typography.text,
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.common.armyGreen,
  },
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  console.log("ck", cartItems);
  const totalPrice = cartItems.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);
  console.log("ck", totalPrice);

  return (
    <Container>
      <Typography className={classes.cartTitle}>Shopping Cart</Typography>
      <Box className={classes.cartBox}>
        <Grid container direction="column" className={classes.cartContainer}>
          {cartItems.map((cartItem, i) => (
            <Grid item key={cartItem.id} className={classes.cartItem}>
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
                    <Grid item>{cartItem.name}</Grid>
                    <Grid item>{cartItem.vendor}</Grid>
                    <Grid item>Price: ${cartItem.price}</Grid>
                    <Grid item>Quantity: {cartItem.quantity}</Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.cartItemRight}>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <IconButton
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: cartItem })
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() =>
                          dispatch({ type: "DECREASE", payload: cartItem })
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: cartItem })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item className={classes.cartItem}>
            {cartItems.length ? (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item className={classes.cartItem2}>
                  Cart Total ${totalPrice}
                </Grid>
                <Grid item className={classes.cartItem2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.cartCheckOutButton}
                  >
                    Check Out
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Typography className={classes.cartItem2}>
                Cart is Empty...
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ShoppingCart;
