const router = require("express").Router();
const Product = require("../model/ProductModel");
const verifyToken = require("./verifyToken");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).send(products);
    } else {
      return res.status(400).send({ errorMessage: "Product not found!" });
    }
  } catch (err) {
    // console.log(err);
    // res.status(400).send(err);
    return next(err);
  }
});

router.use(verifyToken);

router.delete("/delete/:id", async (req, res, next) => {
  const deleteId = req.params.id;
  try {
    const theProduct = await Product.findOne({ id: deleteId });
    if (
      req.userData.userFarm !== theProduct.vendor &&
      req.userData.userFarm !== "*"
    ) {
      const error = new Error("Not Allowed!", 401);
      return next(error);
    }
  } catch (err) {
    return next(err);
  }

  try {
    await Product.deleteOne({ id: deleteId });
    res.status(200).send("items deleted!!!");
  } catch (err) {
    // console.log(err);
    //res.status(400).send(err);
    return next(err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  const updateId = req.params.id;
  try {
    const theProduct = await Product.findOne({ id: updateId });
    if (
      theProduct.vendor !== req.userData.userFarm &&
      req.userData.userFarm !== "*"
    ) {
      const error = new Error("Not Allowed!", 401);
      return next(error);
    }
  } catch (err) {
    return next(err);
  }

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
    return next(err);
  }
});

router.post("/create", async (req, res, next) => {
  if (
    req.userData.userFarm !== req.body.vendor &&
    req.userData.userFarm !== "*"
  ) {
    const error = new Error("Not Allowed!", 401);
    return next(error);
  }

  try {
    const productExist = await Product.findOne({
      name: req.body.name,
      vendor: req.body.vendor,
    });
    if (!!productExist)
      return res.status(400).send({ errorMessage: "Product already exists!" });
  } catch (err) {
    return next(err);
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
    return next(err);
  }
});

module.exports = router;
