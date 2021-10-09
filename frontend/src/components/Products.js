import React, { Fragment, useState } from "react";
import ProdCard from "./ProdCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    height: "3rem",
    width: "20rem",
    //border: "solid 2px purple",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
  },
  searchIconBox: {
    width: "2rem",
    height: "2rem",
  },
  searchBox: {
    width: "16rem",
    //border: "solid green",
    height: "3rem",
  },
}));

const initialProducts = [
  {
    name: "Eggplant",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/eggplant.jpg",
    vendor: "Max's Fun Farm",
    price: 2.49,
    quantity: 1,
    id: "prod_KIZVKYt7mEFlXs",
    unit: "lb",
    priceId: "price_1JdyM9K6cEl29YLI8cAQy2ba",
  },
  {
    name: "Tomato",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato1.jpg",
    vendor: "Max's Fun Farm",
    price: 1.99,
    quantity: 1,
    id: "prod_KIZXpQFS2KXTLF",
    unit: "lb",
    priceId: "price_1JdyOPK6cEl29YLI2XbwU17g",
  },
  {
    name: "Sweet Potatoes",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato1.jpg",
    vendor: "Zoey's Home Farm",
    price: 1.99,
    quantity: 1,
    id: "003",
    unit: "lb",
    priceId: "price_1JdybXK6cEl29YLIGPJZQvgE",
  },
  {
    name: "Cucumbers",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cucumber.jpg",
    vendor: "Noah's Oak Farm",
    price: 4.99,
    quantity: 1,
    id: "prod_KIhnyoYDtl7mQQ",
    unit: "lb",
    priceId: "price_1Je6NpK6cEl29YLIqaN9GqJP",
  },
  {
    name: "Blueberry",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/blueberry.jpg",
    vendor: "Summit Hill Farm",
    price: 6.99,
    quantity: 1,
    id: "prod_KIhpoZrJX5pc3i",
    unit: "pint",
    priceId: "price_1Je6QAK6cEl29YLImZsu0Vtd",
  },
  {
    name: "Lemon",
    imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/lemon.jpg",
    vendor: "Zoey's Home Farm",
    price: 1.49,
    quantity: 1,
    id: "prod_KIhrSt2IQoEO1h",
    unit: "lb",
    priceId: "price_1Je6S8K6cEl29YLI8Ge1vqf5",
  },
  {
    name: "Tomato",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/tomato2.jpg",
    vendor: "Noah's Oak Farm",
    price: 2.49,
    quantity: 1,
    id: "prod_KIhtGGGLFNnbEd",
    unit: "lb",
    priceId: "price_1Je6UAK6cEl29YLIXypAan6x",
  },
  {
    name: "Red Roses",
    imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/rose.jpg",
    vendor: "Madison Rose Farm",
    price: 12.99,
    quantity: 1,
    id: "prod_KIhvdy2mEFyPfV",
    unit: "dozen",
    priceId: "price_1Je6VyK6cEl29YLI3EKPjMSV",
  },
  {
    name: "Cherries",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/cherry.jpg",
    vendor: "Summit Hill Farm",
    price: 6.99,
    quantity: 1,
    id: "prod_KIhycLZfoRUeaG",
    unit: "lb",
    priceId: "price_1Je6YIK6cEl29YLItpSbBPkA",
  },
  {
    name: "Sugar Snap Peas",
    imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/pea.jpg",
    vendor: "Noah's Oak Farm",
    price: 4.99,
    quantity: 1,
    id: "prod_KIZ00kDPjkKOjD",
    unit: "lb",
    priceId: "price_1JdxsLK6cEl29YLIIQayXiJ6",
  },
  {
    name: "Yellow Potato",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/potato.jpg",
    vendor: "Max's Fun Farm",
    price: 1.49,
    quantity: 1,
    id: "prod_KIYzSQqj85s5Eq",
    unit: "lb",
    priceId: "price_1JdxrfK6cEl29YLIrOeB8c3d",
  },
  {
    name: "Strawberries",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/strawberry.jpg",
    vendor: "Morris Family Farm",
    price: 4.99,
    quantity: 1,
    id: "prod_KIi0WlEUlpBWxA",
    unit: "lb",
    priceId: "price_1Je6aFK6cEl29YLIiYaCR7rb",
  },
  {
    name: "Apple",
    imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/apple.jpg",
    vendor: "Morris Family Farm",
    price: 2.99,
    quantity: 1,
    id: "prod_KIi1LhYQviAdtv",
    unit: "lb",
    priceId: "price_1Je6bsK6cEl29YLIX29h4ufw",
  },
  {
    name: "Sweet Potatoes",
    imgUrl:
      "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato2.jpg",
    vendor: "Noah's Oak Farm",
    price: 1.99,
    quantity: 1,
    id: "prod_KIi4vKVVxrRUCg",
    unit: "lb",
    priceId: "price_1Je6epK6cEl29YLIgE0m5BVS",
  },
  {
    name: "Basil",
    imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/basil.jpg",
    vendor: "Zoey's Home Farm",
    price: 4.99,
    quantity: 1,
    id: "prod_KIi661TSYHLq9N",
    unit: "box",
    priceId: "price_1Je6gVK6cEl29YLIeot4WTQ2",
  },
];

const Products = () => {
  const classes = useStyles();
  const [productsState, setProductState] = useState(initialProducts);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setSearchValue(value.toLowerCase());
  }

  return (
    <Fragment>
      <Grid
        container
        className={classes.searchBar}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item className={classes.searchIconBox}>
          <SearchIcon />
        </Grid>
        <Grid item className={classes.searchBox}>
          <TextField
            id="search"
            variant="outlined"
            size="small"
            name="search"
            fullWidth
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search..."
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {productsState.filter((product)=>product.name.toLowerCase().includes(searchValue))
        .map((product, i) => (
          <Grid item key={product.id}>
            <ProdCard
              imgUrl={product.imgUrl}
              name={product.name}
              vendor={product.vendor}
              price={product.price}
              quantity={product.quantity}
              id={product.id}
              unit={product.unit}
              priceId={product.priceId}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
    //<Typography>...No Products</Typography>
  );
};

export default Products;
