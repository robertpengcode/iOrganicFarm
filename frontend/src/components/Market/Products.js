import React, { Fragment, useState, useContext } from "react";
import ProdCard from "./ProdCard";

import { ProductsContext } from "../../context/productsContext";
import { IsExchangingContext } from "./../../context/isExchangingContext";
import { AuthContext } from "./../../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    height: "3rem",
    width: "20rem",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "15rem",
    },
  },
  searchIconBox: {
    width: "2rem",
    height: "2rem",
  },
  searchBox: {
    width: "16rem",
    height: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "12rem",
    },
  },
  sortBar: {
    height: "3rem",
    width: "16rem",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
    //border: "blue solid",
    [theme.breakpoints.down("sm")]: {
      width: "12rem",
    },
  },
  formControl: {
    width: "100%",
  },
}));

const sortOptionsList = [
  "Price: Low to High",
  "Price: High to Low",
  "Product Name (A to Z)",
  "Vendor Name (A to Z)",
];

const Products = () => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const { isExchanging } = useContext(IsExchangingContext);
  const { currentFarm } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const [farmOption, setFarmOption] = useState("");

  const farmsList = [
    "Max's Fun Farm",
    "Zoey's Home Farm",
    "Noah's Oak Farm",
    "Madison Rose Farm",
    "Summit Hill Farm",
    "Morris Family Farm",
  ].filter((farm) => farm !== currentFarm);

  function handleSearch(e) {
    const { value } = e.target;
    setSearchValue(value.toLowerCase());
  }

  function handleFarmOptions(e) {
    const { value } = e.target;
    setFarmOption(value);
  }

  function handleSortOptions(e) {
    const { value } = e.target;
    setSortOption(value);
  }

  function compare() {
    if (sortOption === "Price: Low to High") {
      return priceLowToHigh;
    } else if (sortOption === "Price: High to Low") {
      return priceHighToLow;
    } else if (sortOption === "Product Name (A to Z)") {
      return byProductName;
    } else if (sortOption === "Vendor Name (A to Z)") {
      return byVendorName;
    }
  }

  function priceLowToHigh(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }
  function priceHighToLow(a, b) {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  }
  function byProductName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  function byVendorName(a, b) {
    if (a.vendor < b.vendor) {
      return -1;
    }
    if (a.vendor > b.vendor) {
      return 1;
    }
    return 0;
  }

  const selectExchangeFarm = (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel>Exchange With...</InputLabel>
      <Select
        name="option"
        value={farmOption}
        onChange={(e) => {
          handleFarmOptions(e);
        }}
      >
        {farmsList.map((farm, id) => (
          <MenuItem key={id} value={farm}>
            {farm}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const sortMenu = (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="sortby">Sort by</InputLabel>
      <Select
        name="option"
        defaultValue=""
        value={sortOption}
        labelId="sortby"
        id="select"
        label="sortby"
        onChange={(e) => {
          handleSortOptions(e);
        }}
      >
        {sortOptionsList.map((option, id) => (
          <MenuItem key={id} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Fragment>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid
            container
            className={classes.searchBar}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item className={classes.searchIconBox}>
              <SearchIcon role="img" aria-label="search icon"/>
            </Grid>
            <Grid item className={classes.searchBox}>
              <TextField
                id="search"
                variant="outlined"
                size="small"
                name="search"
                label="search"
                fullWidth
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search..."
              />
            </Grid>
          </Grid>
        </Grid>
        {isExchanging ? (
          <Grid item className={classes.sortBar}>
            {selectExchangeFarm}
          </Grid>
        ) : null}
        <Grid item className={classes.sortBar}>
          {sortMenu}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products
          .filter((product) => product.name.toLowerCase().includes(searchValue))
          .sort(compare())
          .filter((product) => {
            if (farmOption !== "") {
              return product.vendor === farmOption || product.vendor === currentFarm;
            } else {
              return product;
            }
          })
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
                currentFarm={currentFarm}
              />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default Products;
