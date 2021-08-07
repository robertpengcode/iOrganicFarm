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

export default function AboutUs() {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.paragraph}>
        Covid 19 has caused many of us to work and study at home, including many
        gardening lovers who have started to grow more organic food in their
        backyard. Very often our farming skills are limited and we just can’t
        grow all the food that we love. Sometimes we grow too much of one kind
        and have to give them to our friends. The purpose of the website is to
        offer a marketplace for home organic farmers to exchange their produce,
        and for organic food lovers to shop around.
      </Typography>
    </Container>
  );
}
