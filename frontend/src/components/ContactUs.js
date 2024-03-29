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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;
const userID = process.env.REACT_APP_USER_ID;

const useStyles = makeStyles(theme => ({
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
    }
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

export default function ContactUs() {
  useEffect(() => {
    document.title = "Contact Us iOrganicFarm";
  }, []);

  const classes = useStyles();

  const initialEmailValues = {
    subject: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    iWantTo: "",
  };

  const [emailValues, setEmailValues] = useState(initialEmailValues);
  const [emailSent, setEmailSent] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [isPhoneError, setIsPhoneError] = useState(false);

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
    let isEmailValid;
    let isPhoneValid;
    setEmailValues({
      ...emailValues,
      [name]: value,
    });
    if (name === 'email') {
      isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || value==="";
      isEmailValid ? setIsEmailError(false) : setIsEmailError(true);
      isEmailValid ? setEmailErrorMessage('') : setEmailErrorMessage('Invalid email');
    }
    if (name === 'phone') {
      isPhoneValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value) || value==="";
      isPhoneValid ? setIsPhoneError(false) : setIsPhoneError(true);
      isPhoneValid ? setPhoneErrorMessage('') : setPhoneErrorMessage('Invalid phone number');
    }
  }

  function handleChangeSelect(e) {
    const { name, value } = e.target;
    setEmailValues({
      ...emailValues,
      [name]: value,
    });
  }

  useEffect(() => {
    setEmailValues(emailValues);
  }, [emailValues]);

  useEffect(() => {
    if (emailSent === true) {
      setEmailSent(false);
    }
  }, [emailSent]);

  const selectMenu = (
    <FormControl className={classes.formControl}>
        <InputLabel id="iWantTo">I want to...</InputLabel>
        <Select
          name="iWantTo"
          value={emailValues.iWantTo}
          onChange={handleChangeSelect}
        >
          <MenuItem value="beVendor">become an organic produce vendor.</MenuItem>
          <MenuItem value="beShopper">become an organic produce shopper.</MenuItem>
          <MenuItem value="askQuestions">ask questions.</MenuItem>
          <MenuItem value="">leave blank.</MenuItem>
        </Select>
      </FormControl>
  )

  const emailForm = (
    <Paper className={classes.paper}>
      <form className={classes.contactform} onSubmit={sendEmail} >
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" alignItems="flex-end" justifyContent="center" spacing={1}>
              <Grid item><EmailIcon fontSize="large" className={classes.emailIcon}/></Grid>
              <Grid item><Typography className={classes.emailTitle} variant="h1">Email Us</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="subject"
              label="Subject"
              name="subject"
              value={emailValues.subject}
              onChange={handleChange}
              className={classes.emailItem}
              autoComplete="on"
            />
          </Grid>
          <Grid item className={classes.selectMenu}>
            {selectMenu}
          </Grid>
          <Grid item>
            <TextField
              id="name"
              label="Your Name"
              name="name"
              value={emailValues.name}
              onChange={handleChange}
              className={classes.emailItem}
              autoComplete="on"
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
              autoComplete="on"
              error={isEmailError}
              helperText={emailErrorMessage}
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
              autoComplete="on"
              error={isPhoneError}
              helperText={phoneErrorMessage}
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
              autoComplete="on"
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
  <Paper className={classes.paperContainer} role="main" id="main" tabIndex="-1">
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