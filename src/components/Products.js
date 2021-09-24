import React from "react";
import ProdCard from "./ProdCard";
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//const useStyles = makeStyles((theme) => ({}));

const Products = () => {
  //const classes = useStyles();

  const products = [
    {
      name: "Eggplant",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/eggplant.jpg",
      vendor: "Max's Fun Farm",
      price: 2.49,
      quantity: 1,
      id: "001",
      unit: "lb",
    },
    {
      name: "Tomato",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato1.jpg",
      vendor: "Max's Fun Farm",
      price: 1.99,
      quantity: 1,
      id: "002",
      unit: "lb",
    },
    {
      name: "Sweet Potatos",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato1.jpg",
      vendor: "Zoey's Home Farm",
      price: 1.99,
      quantity: 1,
      id: "003",
      unit: "lb",
    },
    {
      name: "Cucumbers",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cucumber.jpg",
      vendor: "Noah's Oak Farm",
      price: 4.99,
      quantity: 1,
      id: "004",
      unit: "lb",
    },
    {
      name: "Blueberry",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/blueberry.jpg",
      vendor: "Summit Hill Farm",
      price: 6.99,
      quantity: 1,
      id: "005",
      unit: "pint",
    },
    {
      name: "Lemon",
      imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/lemon.jpg",
      vendor: "Zoey's Home Farm",
      price: 1.49,
      quantity: 1,
      id: "006",
      unit: "lb",
    },
    {
      name: "Tomato",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato2.jpg",
      vendor: "Noah's Oak Farm",
      price: 2.49,
      quantity: 1,
      id: "007",
      unit: "lb",
    },
    {
      name: "Red Roses",
      imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/rose.jpg",
      vendor: "Madison Rose Farm",
      price: 12.99,
      quantity: 1,
      id: "008",
      unit: "dozen",
    },
    {
      name: "Cherries",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cherry.jpg",
      vendor: "Summit Hill Farm",
      price: 6.99,
      quantity: 1,
      id: "009",
      unit: "lb",
    },
    {
      name: "Sugar Snap Peas",
      imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/pea.jpg",
      vendor: "Noah's Oak Farm",
      price: 4.99,
      quantity: 1,
      id: "010",
      unit: "lb",
    },
    {
      name: "Yellow Potato",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/potato.jpg",
      vendor: "Max's Fun Farm",
      price: 1.49,
      quantity: 1,
      id: "011",
      unit: "lb",
    },
    {
      name: "Strawberries",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/strawberry.jpg",
      vendor: "Morris Family Farm",
      price: 4.99,
      quantity: 1,
      id: "012",
      unit: "lb",
    },
    {
      name: "Apple",
      imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/apple.jpg",
      vendor: "Morris Family Farm",
      price: 2.99,
      quantity: 1,
      id: "013",
      unit: "lb",
    },
    {
      name: "Sweet Potatos",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato2.jpg",
      vendor: "Noah's Oak Farm",
      price: 1.99,
      quantity: 1,
      id: "014",
      unit: "lb",
    },
    {
      name: "Basil",
      imgUrl:
        "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/basil.jpg",
      vendor: "Zoey's Home Farm",
      price: 4.99,
      quantity: 1,
      id: "015",
      unit: "box",
    },
  ];

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
            unit={product.unit}
          />
        </Grid>
      ))}
    </Grid>
    //<Typography>...No Products</Typography>
  );
};

export default Products;
