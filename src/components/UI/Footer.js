import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles(theme => ({
  footer: {
    ...theme.typography.footer,
    backgroundColor: theme.palette.primary.main,
    fontSize: "1rem",
    padding: "0.2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.75rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  gridItem: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "4rem",
    marginRight: "4rem"
  },
  gridLink: {
    fontSize: "0.75rem",
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
    opacity: "0.75",
    "&:hover": {
      opacity: "1"
    }
  },
  gridItemMain: {
    fontWeight: "bold"
  },
  copyRight: {
    ...theme.typography.footer,
    opacity: "0.75"
  }
}));

export default function Footer(props) {
  const classes = useStyles();

  const siteLinks = (
    <Hidden mdDown>
      <Grid container direction="row" justifyContent="center">
        <Grid item className={classes.gridItem}>
          <Grid container direction="column">
            <Grid
              item
              component={Link}
              to="/"
              className={`${classes.gridItemMain}+${classes.gridLink}`}
              onClick={() => {
                props.setTabValue(0);
              }}
            >
              HOME
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column">
            <Grid
              item
              component={Link}
              to="/about"
              className={`${classes.gridItemMain}+${classes.gridLink}`}
              onClick={() => {
                props.setTabValue(1);
              }}
            >
              ABOUT US
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" alignItems="baseline">
            <Grid
              item
              component={Link}
              to="/market"
              className={`${classes.gridItemMain}+${classes.gridLink}`}
              onClick={() => {
                props.setTabValue(2);
                props.setSelectedIndex(0);
              }}
            >
              MARKET
            </Grid>
            <Grid
              item
              component={Link}
              to="/shop"
              className={classes.gridLink}
              onClick={() => {
                props.setTabValue(2);
                props.setSelectedIndex(1);
              }}
            >
              SHOP NOW
            </Grid>
            <Grid
              item
              component={Link}
              to="/exchange"
              className={classes.gridLink}
              onClick={() => {
                props.setTabValue(2);
                props.setSelectedIndex(2);
              }}
            >
              EXCHANGE
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" alignItems="baseline">
            <Grid
              item
              component={Link}
              to="/contact"
              className={`${classes.gridItemMain}+${classes.gridLink}`}
              onClick={() => {
                props.setTabValue(3);
              }}
              target="_blank"
            >
              CONTACT
            </Grid>
            <Grid
              item
              component={Link}
              to="/contact"
              className={classes.gridLink}
              onClick={() => {
                props.setTabValue(3);
              }}
              target="_blank"
            >
              EMAIL US
            </Grid>
            <Grid
              item
              component={Link}
              to="/contact"
              className={classes.gridLink}
              onClick={() => {
                props.setTabValue(3);
              }}
              target="_blank"
            >
              JOIN US
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Hidden>
  );

  const iconButtons = (
    <Fragment>
      <Grid container direction="row" justifyContent="center">
        <IconButton target="_blank" href="https://www.facebook.com">
          <FacebookIcon />
        </IconButton>
        <IconButton target="_blank" href="https://www.instagram.com">
          <InstagramIcon />
        </IconButton>
        <IconButton target="_blank" href="https://www.twitter.com">
          <TwitterIcon />
        </IconButton>
        <IconButton target="_blank" href="https://www.youtube.com">
          <YouTubeIcon />
        </IconButton>
      </Grid>
      <Divider />
    </Fragment>
  );

  return (
    <footer className={classes.footer}>
      {siteLinks}
      {iconButtons}
      <Typography className={classes.copyRight}>© 2021, Robert Peng</Typography>
    </footer>
  );
}
