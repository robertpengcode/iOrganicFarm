import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

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
  createButton: {
    ...theme.typography.text,
    marginBottom: "2rem",
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

export default function CreateAccount() {
  const classes = useStyles();

  const initialAccountValues = {
    name: "",
    email: "",
    password: "",
  };

  const [accountValues, setAccountValues] = useState(initialAccountValues);
  const [isLoading, setIsLoading] = useState(false);
  const [createAccountMessage, setCreateAccountMessage] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  console.log("cckk", isAccountCreated);

  useEffect(() => {
    setAccountValues(accountValues);
  }, [accountValues]);

  function handleAfterCreated() {
    setCreateAccountMessage("Your account is created! Please sign in.");
    setTimeout(() => {
      setCreateAccountMessage("");
      setIsAccountCreated(true);
    }, 3000);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAccountValues({
      ...accountValues,
      [name]: value,
    });
  }

  async function handleCreateAccount(e) {
    e.preventDefault();
    console.log("handle create!!");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: accountValues.name,
          email: accountValues.email,
          password: accountValues.password,
        }),
      });
      const responseData = await response.json();
      console.log("ck front", responseData);
      if (!response.ok) {
        setCreateAccountMessage(responseData.errorMessage);
      } else {
        handleAfterCreated();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setCreateAccountMessage(
        error.message || "Something went wrong, please try again!"
      );
    }
  }

  const emailForm = (
    <Paper className={classes.paper}>
      <form className={classes.contactform} onSubmit={handleCreateAccount}>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.formTitle}>
              Create Account
            </Typography>
          </Grid>
          <Grid item className={classes.messageBox}>
            {isLoading && <Loading />}
            {createAccountMessage && <Error message={createAccountMessage} />}
          </Grid>
          <Grid item>
            <TextField
              required
              id="name"
              variant="outlined"
              label="Your Full Name (Required)"
              name="name"
              value={accountValues.name}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="email"
              variant="outlined"
              label="Your Email (Required)"
              name="email"
              value={accountValues.email}
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
              value={accountValues.subject}
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
              className={classes.createButton}
            >
              CREATE YOUR ACCOUNT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
  return isAccountCreated === false ? (
    <Paper className={classes.paperContainer}>
      <Grid container className={classes.container} alignItems="center">
        <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
        <Grid item xs={10} sm={10} md={8} lg={6} className={classes.sub}>
          {emailForm}
        </Grid>
        <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
      </Grid>
    </Paper>
  ) : (
    <Redirect to="/signin" />
  );
}
