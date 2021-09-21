import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  cardPaper: {
    height: "35vh",
    aspectRatio: "0.75",
  },
  cardContainer: {
    height: "100%",
    width: "100%",
    border: "solid red",
  },
  cardPic: {
    height: "55%",
    aspectRatio: "1",
    border: "dotted purple",
  },
  cardItem: {
    width: "90%",
    border: "dotted blue",
    ...theme.typography.text,
    fontSize: "0.8rem",
    textAlign: "center",
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
        justifyContent="center"
        className={classes.cardContainer}
      >
        <Grid item className={classes.cardPic}>
          <Image src={props.imgUrl} />
        </Grid>
        <Grid item className={classes.cardItem}>
          {props.name}
        </Grid>
        <Grid item className={classes.cardItem}>
          {props.vendor}
        </Grid>
        <Grid item className={classes.cardItem}>
          Price ${props.price}
        </Grid>
        <Grid item className={classes.cardItem}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.homeButton}
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
