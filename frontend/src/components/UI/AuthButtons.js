import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  authButton: {
    ...theme.typography.text,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function AuthButtons() {
  const auth = useContext(AuthContext);

  const classes = useStyles();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.signIn();
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
  }

  const signup = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/create"
    >
      CREATE ACCOUNT
    </Button>
  );

  const signIn = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/signin"
      //onClick={handleSignIn}
    >
      SIGN IN
    </Button>
  );

  const signOut = (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      className={classes.authButton}
      //component={Link}
      //to="/shop"
      onClick={handleSignOut}
    >
      SIGN OUT
    </Button>
  );

  return (
    <Fragment>
      {!auth.isSignedIn && signIn}
      {auth.isSignedIn && signOut}
    </Fragment>
  );
}
