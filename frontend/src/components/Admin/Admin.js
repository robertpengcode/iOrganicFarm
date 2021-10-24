import React, { useContext, useState } from "react";
import { ProductsContext } from "../../context/productsContext";
import EditProducts from "./EditProducts";
import { AuthContext } from "./../../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  adminMessageBox: {
    width: "94%",
  },
  adminMessage: {
    ...theme.typography.text,
    color: "red",
  },
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
  const { updateProducts } = useContext(ProductsContext);
  const { currentFarm, token } = useContext(AuthContext);
  const vendors = [
    "Max's Fun Farm",
    "Zoey's Home Farm",
    "Noah's Oak Farm",
    "Madison Rose Farm",
    "Summit Hill Farm",
    "Morris Family Farm",
  ];
  let filteredVendors = vendors;
  if (currentFarm !== '*') {
    filteredVendors = vendors.filter(vendor => vendor === currentFarm);
  }
   
  const productNames = [
    "Eggplant",
    "Tomato",
    "Lemon",
    "Red Roses",
    "Cherries",
    "Sugar Snap Peas",
    "Yellow Potato",
    "Strawberries",
    "Apple",
    "Basil",
    "Sweet Potatoes",
    "Cucumbers",
    "Blueberry",
  ];
  const productUnits = ["lb", "dozen", "box", "pint"];

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
  const [adminMessage, setAdminMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [editMessage, setEditMessage] = useState("");

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

  async function handleCreateProduct() {
    setAdminMessage("Creating New Product...");
    try {
      const response = await fetch("http://localhost:8080/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token,
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
      });
      if (response.ok) {
        updateProducts();
        setAdminMessage("New Product Created!");
        setTimeout(() => {
          setAdminMessage("");
          setProductValues(initialProductValues);
        }, 5000);
      } else {
        setAdminMessage("Can't Creat. Error Accrued!");
        setTimeout(() => {
          setAdminMessage("");
          setProductValues(initialProductValues);
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
      setAdminMessage("Can't Creat. Error Accrued!");
        setTimeout(() => {
          setAdminMessage("");
          setProductValues(initialProductValues);
        }, 5000);
    }
  }

  async function handleUpdateProduct() {
    setAdminMessage("Updating Product...");
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/update/${updateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization": token,
          },
          body: JSON.stringify({
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
      if (response.ok) {
        updateProducts();
        setAdminMessage("Product Updated!");
      } else {
        setAdminMessage("Can't update. Error Accrued!");
      }
      setTimeout(() => {
        setAdminMessage("");
        setProductValues(initialProductValues);
        setIsEditing(false);
        setUpdateId("");
        setEditMessage("");
      }, 5000);
    } catch (error) {
      console.log(error.message);
      setAdminMessage("Can't update. Error Accrued!");
        setTimeout(() => {
          setAdminMessage("");
          setProductValues(initialProductValues);
          setIsEditing(false);
          setUpdateId("");
          setEditMessage("");
        }, 5000);
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
        {filteredVendors.map((vendor, id) => (
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

  const adminMessageBox = (
    <Grid item className={classes.adminMessageBox}>
      <Typography className={classes.adminMessage}>{adminMessage}</Typography>
    </Grid>
  );

  return (
    <Box className={classes.adminContainer}>
      <Typography className={classes.adminTitle}>Admin Page</Typography>
      <Grid container direction={"column"} spacing={2} alignItems="center">
        {adminMessage ? adminMessageBox : null}
        <Grid item className={classes.adminEditProdContainer}>
          <Paper>
            <Grid container direction="column" className={classes.adminBox}>
              <Grid item>
                <Typography className={classes.adminSubTitle}>
                  {!isEditing ? "Create Products" : "Editing Products"}
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
                      color="primary"
                      className={classes.createProdButton}
                      onClick={
                        !isEditing ? handleCreateProduct : handleUpdateProduct
                      }
                    >
                      {!isEditing ? "Create Product" : "Update Product"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <EditProducts
          setProductValues={setProductValues}
          setIsEditing={setIsEditing}
          setUpdateId={setUpdateId}
          setEditMessage={setEditMessage}
          editMessage={editMessage}
        ></EditProducts>
      </Grid>
    </Box>
  );
};

export default Admin;
