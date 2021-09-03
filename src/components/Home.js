import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  paperContainer: {
    backgroundImage: `url(homeImg.jpg)`,
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
    height: "70vh",
    [theme.breakpoints.down("md")]: {
      height: "60vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "58vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "55vh",
    }
  },
  textContainer: {
    ...theme.typography.text,
    backgroundColor: "white",
    opacity: "0.75",
    height: "50vh",
    padding: "1.5rem",
    [theme.breakpoints.down("md")]: {
      height: "42vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "38vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "36vh",
    }
  },
  title: {
    ...theme.typography.text,
    color: theme.palette.common.brown,
    textDecoration: "none",
    fontSize: "4.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "3.6rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.2rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.7rem"
    }
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
<Fragment>
  <Paper elevation={0} className={classes.paperContainer}>
    <Grid container className={classes.container} alignItems="center">
      <Grid item xs={1} sm={2} md={1} lg={1}>
      </Grid>
      <Grid item xs={10} sm={8} md={7} lg={7}>
        <Grid container className={classes.textContainer}>
          <Typography variant="h1" className={classes.title}>
            Grow and share organic produce with the community.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={2} md={4} lg={4}>
      </Grid>
    </Grid>
  </Paper>
</Fragment>
  );
}
