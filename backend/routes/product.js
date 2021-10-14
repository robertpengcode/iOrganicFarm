const router = require("express").Router();
const { request } = require("express");
const Product = require("../model/ProductModel");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).send(products);
    } else {
      return res.status(400).send({ errorMessage: "Product not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log("ck", req.params.id);
  const deleteId = req.params.id;
  console.log("deleteId", deleteId);
  try {
    await Product.deleteOne({ id: deleteId });
    res.status(200).send("items deleted!!!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  console.log("ck", req.params.id);
  const updateId = req.params.id;
  console.log("updateId", updateId);
  try {
    await Product.updateOne(
      { id: updateId },
      {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        vendor: req.body.vendor,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id,
        unit: req.body.unit,
        priceId: req.body.priceId,
      }
    );
    res.status(200).send("items updated!!!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/createProduct", async (req, res) => {
  try {
    const productExist = await Product.findOne({
      name: req.body.name,
      vendor: req.body.vendor,
    });
    if (!!productExist)
      return res.status(400).send({ errorMessage: "Product already exists!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }

  const product = new Product({
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    vendor: req.body.vendor,
    price: req.body.price,
    quantity: req.body.quantity,
    id: req.body.id,
    unit: req.body.unit,
    priceId: req.body.priceId,
  });
  try {
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
