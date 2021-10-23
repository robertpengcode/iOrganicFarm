import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

import { AuthContext } from "../../context/authContext";

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
  messageBox: {
    marginBottom: "1rem",
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setSignInValues(signInValues);
  }, [signInValues]);

  // function redirectToThankYou() {
  //   setEmailSent(true);
  // }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignInValues({
      ...signInValues,
      [name]: value,
    });
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    //console.log('handle signin!!')
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInValues.email,
          password: signInValues.password,
        }),
      });
      //console.log(response);
      const responseData = await response.json();
      //console.log('resData', responseData);
      if (!response.ok) {
        setIsLoading(false);
        setErrorMessage(
          responseData.errorMessage
        );
      } else {
        setIsLoading(false);
        const {userId, name, userFarm, isAdmin, token} = responseData;
        //console.log('morning', userId, userFarm, isAdmin, token);
        auth.signIn(token, name, userId, userFarm, isAdmin);
      }
      //setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setErrorMessage(
        `Me ${error.message}` || "Something went wrong, please try again!"
      );
    }
  }

  const signInForm = (
    <Paper className={classes.paper}>
      <form className={classes.contactform}
       onSubmit={handleSignIn}
       >
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.formTitle}>Sign In</Typography>
          </Grid>
          <Grid item className={classes.messageBox}>
            {isLoading && <Loading />}
            {errorMessage && <Error message={errorMessage} />}
          </Grid>
          <Grid item>
            <TextField
              required
              id="email"
              variant="outlined"
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
              variant="outlined"
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
