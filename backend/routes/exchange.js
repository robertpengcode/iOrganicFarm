const router = require("express").Router();
const Exchange = require("../model/ExchangeModel");
const verifyToken = require("./verifyToken");

router.get("/", async (req, res) => {
  try {
    const exchanges = await Exchange.find();
    if (exchanges) {
      res.status(200).send(exchanges);
    } else {
      return res.status(400).send({ errorMessage: "Exchanges not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.use(verifyToken);

router.delete("/delete/:id", async (req, res, next) => {
  const deleteId = req.params.id;
  try {
    const theExchange = await Exchange.findOne({ _id: deleteId });
    if (theExchange.requestFrom !== req.userData.userFarm) {
      const error = new Error("Not Allowed!", 401);
      return next(error);
    }
  } catch (err) {
    return next(err);
  }

  try {
    await Exchange.deleteOne({ _id: deleteId });
    res.status(200).send("items deleted!!!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  const updateId = req.params.id;
  try {
    const theExchange = await Exchange.findOne({ _id: updateId });
    if (theExchange.requestTo !== req.userData.userFarm) {
      const error = new Error("Not Allowed!", 401);
      return next(error);
    }
  } catch (err) {
    return next(err);
  }

  try {
    await Exchange.updateOne(
      { _id: updateId },
      {
        status: req.body.status,
      }
    );
    res.status(200).send("items updated!!!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/create", async (req, res, next) => {
  if (req.body.requestFrom !== req.userData.userFarm) {
    const error = new Error("Not Allowed!", 401);
    return next(error);
  }

  const exchange = new Exchange({
    requestFrom: req.body.requestFrom,
    requestTo: req.body.requestTo,
    exchangeInItems: req.body.exchangeInItems,
    exchangeInTotal: req.body.exchangeInTotal,
    exchangeOutItems: req.body.exchangeOutItems,
    exchangeOutTotal: req.body.exchangeOutTotal,
    messages: req.body.messages,
    status: req.body.status,
  });

  try {
    const savedExchange = await exchange.save();
    res.status(201).send(savedExchange);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
