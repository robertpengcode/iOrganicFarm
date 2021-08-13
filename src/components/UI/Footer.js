import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    ...theme.typography.footer,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: "1.5rem",
    padding: "0.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem"
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>© 2021, Robert Peng</footer>;
};

export default Footer;
