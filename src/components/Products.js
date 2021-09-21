import React from "react";
import ProdCard from "./ProdCard";
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//const useStyles = makeStyles((theme) => ({}));

const Products = () => {
  //const classes = useStyles();

  const products = [
      {
          name: 'Tomato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Max's farm",
          price: 1,
      },
      {
          name: 'Sweet potato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Zoey's home farm",
          price: 2,
      },
      {
          name: 'Eggplant',
          imgUrl: "https://picsum.photos/200",
          vendor: "Max's farm",
          price: 3,
      },
      {
          name: 'Cucumber',
          imgUrl: "https://picsum.photos/200",
          vendor: "Madison Garden farm",
          price: 4,
      },
      {
          name: 'Tomato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Summit Hill farm",
          price: 5,
      },
      {
          name: 'Sweet Potato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Max's farm",
          price: 6,
      },
      {
          name: 'Blueberry',
          imgUrl: "https://picsum.photos/200",
          vendor: "Summit Hill farm",
          price: 7,
      },
      {
          name: 'Celery',
          imgUrl: "https://picsum.photos/200",
          vendor: "Zoey's home farm",
          price: 8,
      },
  ]

  return (
    <Grid container spacing={2}>
      {products.map((product, id) => (
        <Grid item key={id}>
          <ProdCard
            key={id}
            imgUrl={product.imgUrl}
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
