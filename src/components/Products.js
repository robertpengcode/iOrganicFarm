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
          quantity: 1,
          id: '001',
      },
      {
          name: 'Sweet potato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Zoey's home farm",
          price: 2,
          quantity: 1,
          id: '002',
      },
      {
          name: 'Eggplant',
          imgUrl: "https://picsum.photos/200",
          vendor: "Max's farm",
          price: 3,
          quantity: 1,
          id: '003',
      },
      {
          name: 'Cucumber',
          imgUrl: "https://picsum.photos/200",
          vendor: "Madison Garden farm",
          price: 4,
          quantity: 1,
          id: '004',
      },
      {
          name: 'Tomato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Summit Hill farm",
          price: 5,
          quantity: 1,
          id: '005',
      },
      {
          name: 'Sweet Potato',
          imgUrl: "https://picsum.photos/200",
          vendor: "Max's farm",
          price: 6,
          quantity: 1,
          id: '006',
      },
      {
          name: 'Blueberry',
          imgUrl: "https://picsum.photos/200",
          vendor: "Summit Hill farm",
          price: 7,
          quantity: 1,
          id: '007',
      },
      {
          name: 'Celery',
          imgUrl: "https://picsum.photos/200",
          vendor: "Zoey's home farm",
          price: 8,
          quantity: 1,
          id: '008',
      },
  ]

  return (
    <Grid container spacing={2}>
      {products.map((product, i) => (
        <Grid item key={product.id}>
          <ProdCard
            imgUrl={product.imgUrl}
            name={product.name}
            vendor={product.vendor}
            price={product.price}
            quantity={product.quantity}
            id={product.id}
          />
        </Grid>
      ))}
    </Grid>
    //<Typography>...No Products</Typography>
  );
};

export default Products;
