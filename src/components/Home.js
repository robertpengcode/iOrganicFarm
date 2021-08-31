import React, { Fragment, useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
//import Button from "@material-ui/core/Button";
//import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  paperContainer: {
    backgroundImage: `url(homeImg.jpg)`,
    height: "70vh",
    width: "100%",
    backgroundSize: "cover",
    opacity: "0.9"
  },
  textContainer: {
    width: "60%",
    backgroundColor: "white",
    marginLeft: "5rem",
    //marginTop: "3rem",
    opacity: "0.7"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    fontFamily: "Playfair Display",
    color: theme.palette.common.brown,
    textDecoration: "none"
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    // <Container>
    //   <Typography variant="h1" className={classes.title}>
    //     Grow and share organic produce with the community.
    //   </Typography>
    // </Container>

<Fragment>
<Box className={classes.box}>
  <Paper elevation={0} className={classes.paperContainer}>
  <Container className={classes.textContainer}>
    <Typography variant="h1" className={classes.title}>
         Grow and share organic produce with the community.
    </Typography>
    </Container>

    {/* <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid item className={classes.itemText}>
        <Typography className={classes.title}>
          [...Now, NavigateToTheNext]
        </Typography>
        <Typography className={classes.subtitle}>
          " Coding Bootcamp Grad Ready To Build! "
        </Typography>
      </Grid>
      <Grid item className={classes.itemAvatar}>
        <Avatar
          alt="Robert Peng Avatar"
          src={robertAvatar}
          className={classes.avatar}
        />
      </Grid>
    </Grid> */}
  </Paper>
</Box>
</Fragment>




  );
}
