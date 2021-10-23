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
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },
}));

export default function AuthButtons() {
  const auth = useContext(AuthContext);

  const classes = useStyles();

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
  }

  const signIn = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/signin"
    >
      SIGN IN
    </Button>
  );

  const signOut = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.authButton}
      onClick={handleSignOut}
    >
      SIGN OUT
    </Button>
  );

  const admin = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.authButton}
      component={Link}
      to="/admin"
    >
      Admin
    </Button>
  );

  return (
    <Fragment>
      {!auth.isSignedIn && signIn}
      {/* {admin} */}
      {auth.isSignedIn && signOut}
      {(auth.isSignedIn && auth.isAdmin) && admin}
    </Fragment>
  );
}
