import React from "react";
import { Link } from "react-router-dom";
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
    width: "75%",
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
  cartItemRight: {
    width: "25%",
    height: "7rem",
    [theme.breakpoints.down("sm")]: {
      height: "5rem",
    },
  },
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
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0)
    .toFixed(2);

  function runFetch(e) {
    e.preventDefault();

    fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    }).then((res) => {
      return res.json();
    })
    .then(({url})=>{
      window.location = url
    })
    .catch((e) => {
      console.error(e.error);
    });
  }

  return (
    <Container>
      <Typography className={classes.cartTitle}>My Shopping Cart</Typography>
      <Box className={classes.cartBox}>
        <Grid container direction="column" className={classes.cartContainer}>
          {cartItems.map((cartItem, i) => (
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
                  <Grid item className={classes.cartItemRight}>
                    <Grid
                      container
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Grid item className={classes.cartIconButton}>
                        <IconButton
                          onClick={() =>
                            dispatch({ type: "INCREASE", payload: cartItem })
                          }
                        >
                          <AddIcon className={classes.cartIcon} />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.cartIconButton}>
                        <IconButton
                          onClick={() => {
                            if (cartItem.quantity > 1) {
                              dispatch({ type: "DECREASE", payload: cartItem });
                            } else {
                              dispatch({ type: "REMOVE", payload: cartItem });
                            }
                          }}
                        >
                          <RemoveIcon className={classes.cartIcon} />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.cartIconButton}>
                        <IconButton
                          onClick={() =>
                            dispatch({ type: "REMOVE", payload: cartItem })
                          }
                        >
                          <ClearIcon className={classes.cartIcon} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Grid item className={classes.cartItem3}>
            {cartItems.length ? (
              <Grid
                container
                justifyContent="center"
                spacing={2}
                alignItems="center"
                className={classes.cartItem4}
              >
                <Grid item className={classes.cartItem2}>
                  Cart Total ${totalPrice}
                </Grid>
                <Grid item className={classes.cartItem2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.cartButton}
                    onClick={runFetch}
                  >
                    Checkout
                  </Button>
                </Grid>
                <Grid item className={classes.cartItem2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.cartButton}
                    component={Link}
                    to="/shop"
                  >
                    Back To Shop
                  </Button>
                </Grid>
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
                    Shopping Cart is Empty...
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.cartButton}
                    component={Link}
                    to="/shop"
                  >
                    Back To Shop
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ShoppingCart;
