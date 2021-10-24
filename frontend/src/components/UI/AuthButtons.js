import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSignOut = (e) => {
    let path="/"; 
    e.preventDefault();
    auth.signOut();
    dispatch({
      type: "EMPTY",
    });
    dispatch({
      type: "exEMPTY",
    });
    history.push(path);
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
      component={Link}
      to="/"
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
      {auth.isSignedIn && signOut}
      {(auth.isSignedIn && auth.isAdmin) && admin}
    </Fragment>
  );
}
