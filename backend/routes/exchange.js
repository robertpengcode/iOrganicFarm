const router = require("express").Router();
const Exchange = require("../model/ExchangeModel");

router.get("/", async (req, res) => {
  try {
    const exchanges = await Exchange.find();
    if (exchanges) {
      res.status(200).send(exchanges);
    } else {
      return res.status(400).send({ errorMessage: "Exchanges not found!" });
    }
    //res.send('hihi haha test exchange!')
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// router.delete("/delete/:id", async (req, res) => {
//   console.log("ck", req.params.id);
//   const deleteId = req.params.id;
//   console.log("deleteId", deleteId);
//   try {
//     await Product.deleteOne({ id: deleteId });
//     res.status(200).send("items deleted!!!");
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// });

// router.put("/update/:id", async (req, res) => {
//   console.log("ck", req.params.id);
//   const updateId = req.params.id;
//   console.log("updateId", updateId);
//   try {
//     await Product.updateOne(
//       { id: updateId },
//       {
//         name: req.body.name,
//         imgUrl: req.body.imgUrl,
//         vendor: req.body.vendor,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         id: req.body.id,
//         unit: req.body.unit,
//         priceId: req.body.priceId,
//       }
//     );
//     res.status(200).send("items updated!!!");
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// });

router.post("/create", async (req, res) => {
//   try {
//     const productExist = await Product.findOne({
//       name: req.body.name,
//       vendor: req.body.vendor,
//     });
//     if (!!productExist)
//       return res.status(400).send({ errorMessage: "Product already exists!" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }

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