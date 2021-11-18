import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(aboutImg.jpg)`,
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
    height: "100%",
  },
  textContainer: {
    backgroundColor: "white",
    opacity: "0.75",
    padding: "1.5rem",
    borderRadius: "1rem",
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
  title: {
    ...theme.typography.text,
    color: theme.palette.common.brown,
    textDecoration: "none",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem"
    }
  },
  paragraph: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.brown,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
}));

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us iOrganicFarm";
  }, []);

  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      className={classes.paperContainer}
      id="main"
      role="main"
      tabIndex="-1"
    >
      <Grid container className={classes.container} alignItems="center">
        <Grid item xs={1} sm={2} md={2} lg={2}></Grid>
        <Grid item xs={10} sm={8} md={8} lg={8}>
          <Grid container className={classes.textContainer}>
            <Typography variant="h1" className={classes.title}>
              About Us
            </Typography>
            <Typography variant="body1" className={classes.paragraph}>
              Covid 19 has caused many of us to work and study at home,
              including many gardening lovers who have started to grow more
              organic food in their backyard. Very often our farming skills are
              limited and we just can’t grow all the food that we love.
              Sometimes we grow too much of one kind and have to give them to
              our friends. The purpose of the website is to offer a marketplace
              for home organic farmers to exchange their produce, and for
              organic food lovers to shop around.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={1} sm={2} md={2} lg={2}></Grid>
      </Grid>
    </Paper>
  );
}
