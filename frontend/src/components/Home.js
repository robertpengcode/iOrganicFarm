import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  paperContainer: {
    backgroundImage: `url(homeImg.jpg)`,
    height: "72vh",
    width: "100%",
    backgroundSize: "cover",
    opacity: "0.9",
    //border: "solid black",
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
  titleContainer: {
    height: "55vh",
    //border: "solid red",
    [theme.breakpoints.down("md")]: {
      height: "50vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "42vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "42vh",
    }
  },
  filled: {
    //border: "solid purple",
    height: "2rem",
  },
  textContainer: {
    ...theme.typography.text,
    backgroundColor: "white",
    opacity: "0.75",
    height: "42vh",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    //border: "solid blue",
    [theme.breakpoints.down("md")]: {
      height: "38vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "35vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "35vh",
    }
  },
  title: {
    ...theme.typography.text,
    color: theme.palette.common.brown,
    textDecoration: "none",
    fontSize: "4.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "3.5rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.9rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.7rem"
    }
  },
  buttonContainer: {
    height: "12vh",
    //border: "solid brown",
    [theme.breakpoints.down("md")]: {
      height: "15vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "18vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "18vh",
    }
  },
  homeButton: {
    ...theme.typography.text,
    marginBottom: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Home() {
  const classes = useStyles();
  const { currentFarm, isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Home Page iOrganicFarm";
  }, []);

  return (
<Box id="main">
  <Paper elevation={0} className={classes.paperContainer}>
    <Grid container direction="column">
      <Grid item>
        <Grid container className={classes.titleContainer} alignItems="center">
          <Grid item xs={1} sm={2} md={1} lg={1} className={classes.filled}></Grid>
          <Grid item xs={10} sm={8} md={7} lg={7}>
            <Grid container className={classes.textContainer}>
              <Typography variant="h1" className={classes.title}>
                Grow and share organic produce with the community.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} md={4} lg={4} className={classes.filled}></Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container className={classes.buttonContainer} justifyContent="center" alignItems="center">
          <Grid item xs={1} sm={2} md={1} lg={1} className={classes.filled}></Grid>
          <Grid item xs={10} sm={8} md={7} lg={7}>
            <Grid container justifyContent="space-around">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.homeButton}
                component={Link}
                to="/shop"
              >
              Shop Organic Products
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.homeButton}
                component={Link}
                to={currentFarm && isSignedIn ? "/exchange": isSignedIn? "/contact": "/signin"}
              >
              Exchange Products
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} md={4} lg={4} className={classes.filled}></Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
</Box>
  );
}
