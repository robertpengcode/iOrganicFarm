import React, {Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  text: {
    ...theme.typography.text,
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
    }
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
    }
  },
}));

const ThankYou = () => {
  const classes = useStyles();
  return (
<Fragment>
<Paper elevation={0} className={classes.paperContainer}>
  <Grid container className={classes.container} alignItems="center">
    <Grid item xs={1} sm={2} md={4} lg={4}>
    </Grid>
    <Grid item xs={10} sm={8} md={4} lg={4}>
      <Grid container className={classes.textContainer} direction="column">
        <Typography variant="h3" className={classes.text}>Thank You!</Typography>
      <Typography variant="h4" className={classes.text}>For contacting us.</Typography>
      <Typography variant="h5" className={classes.text}>We will get back to you soon.</Typography>
      </Grid>
    </Grid>
    <Grid item xs={1} sm={2} md={4} lg={4}>
    </Grid>
  </Grid>
</Paper>
</Fragment>
  );
};

export default ThankYou;