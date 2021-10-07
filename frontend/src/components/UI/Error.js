import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    errorText: {
        ...theme.typography.text,
        fontSize: "1.5rem",
        //color: theme.palette.common.armyGreen,
        color: "red",
        [theme.breakpoints.down("md")]: {
            fontSize: "1.3rem",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.1rem",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.9rem",
        },
      },
}));

export default function Error(props) {
  const classes = useStyles();
  return <Typography className={classes.errorText}>{props.message}</Typography>;
}
