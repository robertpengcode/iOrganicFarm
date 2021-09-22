import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  cardPaper: {
    height: "50vh",
    aspectRatio: "0.6",
  },
  cardContainer: {
    height: "100%",
    width: "100%",
  },
  cardPic: {
    marginTop: "0.3rem",
    width: "95%",
    aspectRatio: "1",
  },
  cardVendor: {
    width: "95%",
    ...theme.typography.text,
    color: theme.palette.common.armyGreen,
    fontSize: "0.8rem",
    textAlign: "left",
    marginTop: "0.5rem",
  },
  cardProdName: {
    width: "95%",
    ...theme.typography.text,
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    marginTop: "0.5rem",
  },
  cardPrice: {
    width: "95%",
    ...theme.typography.text,
    fontSize: "0.8rem",
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    marginTop: "0.5rem",
  },
//   cardItem: {
//     width: "90%",
//     border: "dotted blue",
//     ...theme.typography.text,
//     fontSize: "1rem",
//     textAlign: "left",
//     fontWeight: "bold",
//     color: theme.palette.secondary.main,
//   },
  button: {
    ...theme.typography.text,
    //marginBottom: "1rem",
    //fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    marginTop: "1rem",
  },
}));

const Card = (props) => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cartItems);
  console.log('ck', cartItems);
  const dispatch = useDispatch();

  return (
    <Paper className={classes.cardPaper}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.cardContainer}
      >
        <Grid item className={classes.cardPic}>
          <Image src={props.imgUrl} />
        </Grid>
        <Grid item className={classes.cardVendor}>
          {props.vendor}
        </Grid>
        <Grid item className={classes.cardProdName}>
          {props.name}
        </Grid>
        <Grid item className={classes.cardPrice}>
          ${props.price}/{props.unit}
        </Grid>
        <Grid item className={classes.cardItem}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.button}
            onClick={() => dispatch({type: "ADD", payload: props})}
          >
            Add To Cart
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
