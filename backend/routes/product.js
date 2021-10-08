const router = require("express").Router();
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
