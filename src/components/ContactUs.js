import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  paragraph: {
    fontSize: "2rem",
    fontFamily: "Playfair Display",
    color: theme.palette.common.brown,
  }
}));

export default function ContactUs() {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.paragraph}>
        Contact Us
      </Typography>
    </Container>
  );
}