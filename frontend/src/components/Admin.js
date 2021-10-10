import React, { useContext, useState } from "react";
import { ProductsContext } from "./../context/productsContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  adminContainer: {
    height: "78vh",
    width: "100%",
    border: "solid blue",
    [theme.breakpoints.down("md")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "81vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "82vh",
    },
  },
  adminBox: {
    padding: "0.5rem",
    width: "98%",
    border: "solid red",
  },
  adminTitle: {
    ...theme.typography.text,
    fontSize: "1.8rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  adminSubTitle: {
    ...theme.typography.text,
    fontSize: "1.5rem",
    color: theme.palette.common.armyGreen,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  formControl: {
    width: "11rem",
  },
  createContainer: {
    width: "100%",
    height: "5rem",
    border: "solid green",
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  productId: {
    width: "12rem",
  },
  productPrice: {
    width: "8rem",
  },
  productUrl: {
    width: "20rem",
  }
}));

const Admin = () => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const vendorsArray = products.map((product) => product.vendor);
  const vendors = [...new Set(vendorsArray)];
  const productNamesArray = products.map((product) => product.name);
  const productNames = [...new Set(productNamesArray)];
  const productUnitsArray = products.map((product) => product.unit);
  const productUnits = [...new Set(productUnitsArray)];
  console.log(vendors);
  console.log(productNames);

  const initialProductValues = {
    id: "",
    imgUrl: "",
    name: "",
    price: 0,
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
    <Container className={classes.adminContainer}>
      <Typography className={classes.adminTitle}>Admin Page</Typography>
      <Grid container direction="column" className={classes.adminBox}>
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
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            className={classes.createContainer}
          >
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
            <Grid item><TextField
                label="Price USD"
                name="price"
                variant="outlined"
                size="small"
                value={productValues.price}
                onChange={handleChange}
                className={classes.productPrice}
              /></Grid>
            <Grid item><TextField
                label="IMAGE URL"
                name="imgUrl"
                variant="outlined"
                size="small"
                value={productValues.imgUrl}
                onChange={handleChange}
                className={classes.productUrl}
              /></Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item>
          <Typography className={classes.adminSubTitle}>
            Edit Products
          </Typography>
          <div>Edit Products Here</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
