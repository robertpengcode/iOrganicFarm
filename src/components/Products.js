import React, { Fragment } from "react";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Products = () => {
  const classes = useStyles();

  const products = [
      {
          name: 'Tomato',
          vendor: "Max's farm",
          price: 1,
      },
      {
          name: 'Sweet potato',
          vendor: "Zoey's home farm",
          price: 2,
      },
      {
          name: 'Eggplant',
          vendor: "Max's farm",
          price: 3,
      },
      {
          name: 'Cucumber',
          vendor: "Madison Garden farm",
          price: 4,
      },
      {
          name: 'Tomato',
          vendor: "Summit Hill farm",
          price: 5,
      },
      {
          name: 'Sweet Potato',
          vendor: "Max's farm",
          price: 6,
      },
      {
          name: 'Blueberry',
          vendor: "Summit Hill farm",
          price: 7,
      },
      {
          name: 'Celery',
          vendor: "Zoey's home farm",
          price: 8,
      },
  ]

  return (
    <Grid container spacing={2}>
      {products.map((product, id) => (
        <Grid item>
          <Card
            key={id}
            //picUrl={product.picUrl}
            name={product.name}
            vendor={product.vendor}
            price={product.price}
          />
        </Grid>
      ))}
    </Grid>
    //<Typography>...No Products</Typography>
  );
};

export default Products;
