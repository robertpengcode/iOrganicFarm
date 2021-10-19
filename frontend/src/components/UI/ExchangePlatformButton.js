import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Badge from "@mui/material/Badge";

const useStyles = makeStyles((theme) => ({
  exButton: {
    ...theme.typography.text,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },
}));

export default function ExchangePlatformButton(props) {
  const classes = useStyles();
  const totalExchangeItems = props.totalExchangeItems;
  
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      component={Link}
      to="/exchangeplatform"
      className={classes.exButton}
    >
      <Badge badgeContent={totalExchangeItems} color="error">
        Exchange Platform
      </Badge>
    </Button>
  );
}
