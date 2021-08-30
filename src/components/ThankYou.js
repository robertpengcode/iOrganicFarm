import React from "react";
//import navigateImg from "./../../src/pics/navigate.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "1rem",
    width: "50%",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    height: "76vh",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "55%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
  paperForImg: {
    width: "50%",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    aspectRatio: "1",
    [theme.breakpoints.down("md")]: {
      width: "55%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
  img: {
    width: "100%",
  },
}));

const ThankYou = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">Thank You!</Typography>
      <Typography variant="h5">For contacting us.</Typography>
      <Typography variant="h5">We'll be in touch soon.</Typography>
      <Paper className={classes.paperForImg}>
        {/* <Image src={navigateImg} className={classes.img} /> */}
      </Paper>
    </Paper>
  );
};

export default ThankYou;