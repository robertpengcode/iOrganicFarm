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
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
}));

export default function Shop() {
  const classes = useStyles();
  const { updateIsExchanging } = useContext(IsExchangingContext);
  useEffect(() => {
    updateIsExchanging(false);
  });
  useEffect(() => {
    document.title = "Shop Now iOrganicFarm";
  }, []);

  return (
    <Container id="main">
      <Typography variant="h1" className={classes.shopTitle} >
        Shop Our Organic Products
      </Typography>
      <Box className={classes.productsBox}>
        <Products className={classes.productsContainer}/>
      </Box>
    </Container>
  );
}