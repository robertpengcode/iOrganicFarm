import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  text1: {
    ...theme.typography.text,
    fontSize: "3.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  text2: {
    ...theme.typography.text,
    fontSize: "2.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  text3: {
    ...theme.typography.text,
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  paperContainer: {
    backgroundImage: `url(thankImg.jpg)`,
    height: "72vh",
    width: "100%",
    backgroundSize: "cover",
    opacity: "0.9",
    [theme.breakpoints.down("md")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "82vh",
    },
  },
  container: {
    height: "80%",
  },
  textContainer: {
    backgroundColor: "white",
    opacity: "0.75",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
}));

const Success = () => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Success iOrganicFarm";
  }, []);
  return (
      <Paper elevation={0} className={classes.paperContainer} id="main" role="main" tabIndex="-1">
        <Grid container className={classes.container} alignItems="center">
          <Grid item xs={1} sm={2} md={3} lg={3}></Grid>
          <Grid item xs={10} sm={8} md={6} lg={6}>
            <Grid
              container
              className={classes.textContainer}
              direction="column"
            >
              <Typography variant="h1" className={classes.text1}>
                Payment is accepted.
              </Typography>
              <Typography className={classes.text2}>
                Thank you for shopping!
              </Typography>
              <Typography className={classes.text3}>
                Your order is on the way.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={3}></Grid>
        </Grid>
      </Paper>
  );
};

export default Success;
