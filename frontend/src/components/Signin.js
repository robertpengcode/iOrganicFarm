import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";

import { AuthContext } from "./../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(contactImg.jpg)`,
    height: "78vh",
    width: "100%",
    backgroundSize: "cover",
    [theme.breakpoints.down("md")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "82vh",
    },
  },
  container: {
    height: "100%",
  },
  sub: {
    height: "85%",
  },
  paper: {
    backgroundColor: "white",
    opacity: "0.85",
  },
  contactform: {
    textAlign: "Center",
  },
  formTitle: {
    ...theme.typography.text,
    fontSize: "2rem",
    color: theme.palette.common.armyGreen,
  },
  emailItem: {
    width: "80%",
    marginBottom: "0.75rem",
    color: "blue",
  },
  signinButton: {
    ...theme.typography.text,
    marginBottom: "2rem",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    marginTop: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      marginTop: "0.5rem",
      marginBottom: "1rem",
    },
  },
  selectMenu: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "0.75rem",
  },
  formControl: {
    width: "100%",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const initialSignInValues = {
    email: "",
    password: "",
  };

  const [signInValues, setSignInValues] = useState(initialSignInValues);
  //const [emailSent, setEmailSent] = useState(false);

  // function redirectToThankYou() {
  //   setEmailSent(true);
  // }

  // function sendEmail(e) {
  //   e.preventDefault();
  //   emailjs.sendForm(serviceID, templateID, e.target, userID).then(
  //     (result) => {
  //       redirectToThankYou();
  //     },
  //     (error) => {
  //       console.log(error.text);
  //     }
  //   );
  //   setEmailValues(initialEmailValues);
  // }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignInValues({
      ...signInValues,
      [name]: value,
    });
  }

  useEffect(() => {
    setSignInValues(signInValues);
  }, [signInValues]);

  // useEffect(() => {
  //   if (emailSent === true) {
  //     setEmailSent(false);
  //   }
  // }, [emailSent]);

  const signInForm = (
    <Paper className={classes.paper}>
      <form className={classes.contactform}
       //onSubmit={sendEmail}
       >
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.formTitle}>Sign In</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              id="email"
              label="Your Email (Required)"
              name="email"
              //value={emailValues.email}
              value={signInValues.email}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="password"
              label="Password (Required)"
              name="password"
              value={signInValues.password}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              className={classes.signinButton}
            >
              SIGN IN MY ACCOUNT
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.signinButton}
              component={Link}
              to="/create"
            >
              CREATE NEW ACCOUNT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
  // return emailSent === false ? (
  //   <Paper className={classes.paperContainer}>
  //     <Grid container className={classes.container} alignItems="center">
  //       <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
  //       <Grid item xs={10} sm={10} md={8} lg={6} className={classes.sub}>
  //         {emailForm}
  //       </Grid>
  //       <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
  //     </Grid>
  //   </Paper>
  // ) : (
  //   <Redirect to="/thankyou" />
  // );
  return (
      <Paper className={classes.paperContainer}>
      <Grid container className={classes.container} alignItems="center">
        <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
        <Grid item xs={10} sm={10} md={8} lg={6} className={classes.sub}>
          {signInForm}
        </Grid>
        <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
      </Grid>
    </Paper>
  )
}
