const router = require("express").Router();
const Product = require("../model/ProductModel");

router.post("/createProduct", async (req, res) => {
  // const { error } = signupValidation(req.body);
  // if (error) return res.status(400).send({errorMessage: error.details[0].message});

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
