import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  authButton: {
    ...theme.typography.text,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    marginTop: "0.8rem",
  },
}));

export default function AuthButtons() {
  const classes = useStyles();

  const signup = (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/create"
    >
      CREATE ACCOUNT
    </Button>
  );

  const login = (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/signin"
    >
      SIGN IN
    </Button>
  );

  const logout = (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      className={classes.authButton}
      //component={Link}
      //to="/shop"
    >
      LOG OUT
    </Button>
  );

  return (
    <Fragment>
      {signup}
      {login}
      {logout}
    </Fragment>
  );
}
