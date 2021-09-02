import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import emailjs from "emailjs-com";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import EmailIcon from '@material-ui/icons/Email';
// import FormControl from "@material-ui/core/FormControl";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;
const userID = process.env.REACT_APP_USER_ID;

const useStyles = makeStyles(theme => ({
  paperContainer: {
    backgroundImage: `url(contactImg.jpg)`,
    height: "72vh",
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
    }
  },
  container: {
    height: "100%",
    //border: "solid",
  },
  sub: {
    //border: "solid",
    height: "85%",
  },
  paper: {
    backgroundColor: "white",
    opacity: "0.85",
    //border: "solid",
  },
  contactform: {
    textAlign: "Center",
  },
  emailTitle: {
    ...theme.typography.text,
    fontSize: "2rem",
    color: theme.palette.common.armyGreen,
  },
  emailIcon: {
    color: theme.palette.common.armyGreen,
  },
  emailItem: {
    width: "80%",
    marginBottom: "0.75rem",
    color: "blue",
  },
  emailButton: {
    ...theme.typography.text,
    marginBottom: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.common.armyGreen,
  },
}));

export default function ContactUs() {
  const classes = useStyles();

  const initialEmailValues = {
    subject: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [emailValues, setEmailValues] = useState(initialEmailValues);
  const [emailSent, setEmailSent] = useState(false);

  function redirectToThankYou() {
    setEmailSent(true);
  }

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(serviceID, templateID, e.target, userID).then(
      (result) => {
        redirectToThankYou();
      },
      (error) => {
        console.log(error.text);
      }
    );
    setEmailValues(initialEmailValues);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEmailValues({
      ...emailValues,
      [name]: value,
    });
  }

  // function handleChangeCheck(e) {
  //   const { name, checked } = e.target;
  //   setEmailValues({
  //     ...emailValues,
  //     [name]: checked,
  //   });
  // }

  useEffect(() => {
    setEmailValues(emailValues);
  }, [emailValues]);

  useEffect(() => {
    if (emailSent === true) {
      setEmailSent(false);
    }
  }, [emailSent]);

  const emailForm = (
    <Paper className={classes.paper}>
      <form className={classes.contactform} onSubmit={sendEmail}>
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" alignItems="flex-end" justify="center" spacing={1}>
              <Grid item><EmailIcon fontSize="large" className={classes.emailIcon}/></Grid>
              <Grid item><Typography className={classes.emailTitle}>Email Us</Typography></Grid>
            </Grid>
          </Grid>
          {/* <Grid item className={classes.checkBoxes}>
            {checkBoxes}
          </Grid> */}
          <Grid item>
            <TextField
              id="subject"
              label="Subject"
              name="subject"
              value={emailValues.subject}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              id="name"
              label="Your Name"
              name="name"
              value={emailValues.name}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="email"
              label="Your Email (Required)"
              name="email"
              value={emailValues.email}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              id="phone"
              label="Your Phone# (Optional)"
              name="phone"
              value={emailValues.phone}
              onChange={handleChange}
              className={classes.emailItem}
            />
          </Grid>
          <Grid item>
            <TextField
              id="message"
              label="Message"
              name="message"
              multiline
              rows={3}
              variant="outlined"
              value={emailValues.message}
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
              className={classes.emailButton}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
  return emailSent === false ? 
  <Paper className={classes.paperContainer}>
    <Grid container className={classes.container} alignItems="center">
      <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
      <Grid item xs={10} sm={10} md={8} lg={6} className={classes.sub}>
        {emailForm}
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={3} className={classes.sub}></Grid>
    </Grid>
  </Paper>
  : <Redirect to="/thankyou" />;
}