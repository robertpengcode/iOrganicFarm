import React, {useContext, useEffect} from "react";
import Products from "./Products";
import { IsExchangingContext } from "./../../context/isExchangingContext";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  productsBox: {
    padding: "0.5rem",
    width: "98%",
  },
  productsContainer: {
    width: "100%",
  },
  shopTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
}));

export default function Exchange() {
  const classes = useStyles();
  const { isExchanging, updateIsExchanging } = useContext(IsExchangingContext);
  useEffect(() => {
    updateIsExchanging(true);
  });
  console.log('exchange?',isExchanging);

  return (
    <Container>
      <Typography className={classes.shopTitle}>
        Exchange Products
      </Typography>
      <Box className={classes.productsBox}>
        <Products className={classes.productsContainer}/>
      </Box>
    </Container>
  );
}
