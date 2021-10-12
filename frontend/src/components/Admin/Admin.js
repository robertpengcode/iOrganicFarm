import React, { useContext, useState } from "react";
import { ProductsContext } from "../../context/productsContext";
import EditProducts from "./EditProducts";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  adminContainer: {
    width: "100%",
  },
  adminCreateProdContainer: {
    width: "95%",
  },
  adminEditProdContainer: {
    width: "95%",
    marginBottom: "1rem",
  },
  adminBox: {
    padding: "0.5rem",
    width: "98%",
  },
  adminTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    marginLeft: "1rem",
  },
  // adminSubTitle: {
  //   ...theme.typography.text,
  //   fontSize: "1.5rem",
  //   color: theme.palette.common.armyGreen,
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "1.2rem",
  //   },
  // },
  adminSubTitle: {
    marginLeft: "0.5rem",
  },
  formControl: {
    width: "11rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  createContainer: {
    width: "100%",
    borderRadius: "0.5rem",
  },
  productId: {
    width: "12rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  productPrice: {
    width: "8rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  productUrl: {
    width: "20rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  createProdButton: {
    ...theme.typography.text,
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.common.armyGreen,
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
}));

const Admin = () => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const { updateProducts } = useContext(ProductsContext);
  const vendorsArray = products.map((product) => product.vendor);
  const vendors = [...new Set(vendorsArray)];
  const productNamesArray = products.map((product) => product.name);
  const productNames = [...new Set(productNamesArray)];
  const productUnitsArray = products.map((product) => product.unit);
  const productUnits = [...new Set(productUnitsArray)];
  //console.log(vendors);
  //console.log(productNames);

  const initialProductValues = {
    id: "",
    imgUrl: "",
    name: "",
    price: "",
    priceId: "",
    quantity: 1,
    unit: "",
    vendor: "",
  };

  const [productValues, setProductValues] = useState(initialProductValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
  }

  function handleChangeSelect(e) {
    const { name, value } = e.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    console.log("create product!!");
    //setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/product/createProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: productValues.id,
            imgUrl: productValues.imgUrl,
            name: productValues.name,
            price: productValues.price,
            priceId: productValues.priceId,
            quantity: productValues.quantity,
            unit: productValues.unit,
            vendor: productValues.vendor,
          }),
        }
      );
      const responseData = await response.json();
      console.log("ck front", responseData);
      //   if (!response.ok) {
      //     //throw new Error(responseData.errorMessage);
      //     setErrorMessage(
      //       responseData.errorMessage
      //     );
      //   }
      //   setIsLoading(false);
      updateProducts();
    } catch (error) {
      console.log(error.message);
      //setIsLoading(false);
      //   setErrorMessage(
      //     error.message || "Something went wrong, please try again!"
      //   );
    }
  }

  const selectVendorMenu = (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel>Vendor</InputLabel>
      <Select
        name="vendor"
        value={productValues.vendor}
        onChange={handleChangeSelect}
      >
        {vendors.map((vendor, id) => (
          <MenuItem key={id} value={vendor}>
            {vendor}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const selectProductMenu = (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel>Product Name</InputLabel>
      <Select
        name="name"
        value={productValues.name}
        onChange={handleChangeSelect}
      >
        {productNames.map((productName, id) => (
          <MenuItem key={id} value={productName}>
            {productName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const selectUnitMenu = (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel>Unit</InputLabel>
      <Select
        name="unit"
        value={productValues.unit}
        onChange={handleChangeSelect}
      >
        {productUnits.map((unit, id) => (
          <MenuItem key={id} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box className={classes.adminContainer}>
      <Typography className={classes.adminTitle}>Admin Page</Typography>
      <Grid container direction={"column"} spacing={2} alignItems="center">
        <Grid item className={classes.adminEditProdContainer}>
          <Paper>
            <Grid
              container
              direction="column"
              //alignItems="center"
              className={classes.adminBox}
            >
              <Grid item>
                <Typography className={classes.adminSubTitle}>
                  Create Products
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                  className={classes.createContainer}
                >
                  <Grid item>{selectVendorMenu}</Grid>
                  <Grid item>{selectProductMenu}</Grid>
                  <Grid item>{selectUnitMenu}</Grid>
                  <Grid item>
                    <TextField
                      label="ID"
                      name="id"
                      variant="outlined"
                      size="small"
                      value={productValues.id}
                      onChange={handleChange}
                      className={classes.productId}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Price ID"
                      name="priceId"
                      variant="outlined"
                      size="small"
                      value={productValues.priceId}
                      onChange={handleChange}
                      className={classes.productId}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Price USD"
                      name="price"
                      variant="outlined"
                      size="small"
                      value={productValues.price}
                      onChange={handleChange}
                      className={classes.productPrice}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="IMAGE URL"
                      name="imgUrl"
                      variant="outlined"
                      size="small"
                      value={productValues.imgUrl}
                      onChange={handleChange}
                      className={classes.productUrl}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      //size="medium"
                      color="primary"
                      className={classes.createProdButton}
                      onClick={handleCreateProduct}
                    >
                      CREATE PRODUCT
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item className={classes.adminEditProdContainer}>
          <Paper>
            <Grid container direction="column" alignItems="center">
              {/* <Grid item>
                <Typography className={classes.adminSubTitle}>
                  Edit Products
                </Typography>
              </Grid> */}
              <Grid item>
                <EditProducts></EditProducts>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;

//   {
//     name: "Sweet Potatoes",
//     imgUrl:
//       "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/sweetpotato2.jpg",
//     vendor: "Noah's Oak Farm",
//     price: 1.99,
//     quantity: 1,
//     id: "prod_KIi4vKVVxrRUCg",
//     unit: "lb",
//     priceId: "price_1Je6epK6cEl29YLIgE0m5BVS",
//   },

//   {
//     name: "Basil",
//     imgUrl: "https://robertpengcodefarm.s3.amazonaws.com/forFarmPj/basil.jpg",
//     vendor: "Zoey's Home Farm",
//     price: 4.99,
//     quantity: 1,
//     id: "prod_KIi661TSYHLq9N",
//     unit: "box",
//     priceId: "price_1Je6gVK6cEl29YLIeot4WTQ2",
//   },
