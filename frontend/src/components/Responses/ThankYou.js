import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  text1: {
    ...theme.typography.text,
    fontSize: "3.5rem"
  },
  text2: {
    ...theme.typography.text,
    fontSize: "2rem"
  },
  text3: {
    ...theme.typography.text,
    fontSize: "1.3rem"
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
  useEffect(() => {
    document.title = "Thank You iOrganicFarm";
  }, []);
  return (

<Paper elevation={0} className={classes.paperContainer} id="main" role="main" tabIndex="-1">
  <Grid container className={classes.container} alignItems="center">
    <Grid item xs={1} sm={2} md={4} lg={4}>
    </Grid>
    <Grid item xs={10} sm={8} md={4} lg={4}>
      <Grid container className={classes.textContainer} direction="column">
        <Typography variant="h1" className={classes.text1}>Thank You!</Typography>
      <Typography className={classes.text2}>For contacting us.</Typography>
      <Typography className={classes.text3}>We will get back to you soon.</Typography>
      </Grid>
    </Grid>
    <Grid item xs={1} sm={2} md={4} lg={4}>
    </Grid>
  </Grid>
</Paper>

  );
};

export default ThankYou;