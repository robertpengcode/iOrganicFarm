require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
app.use(express.json());
//app.use(express.static("public"));
app.use(
  cors({
    //origin: "*",
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  })
);
//const YOUR_DOMAIN = "http://localhost:3000";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

///Users/robertpeng/WebDev/Robert_Projects/i_organic_farm/server
app.get("/", cors(), (req, res) => res.send("Hello!!! running..."));

app.post("/create-checkout-session", cors(), async (req, res) => {
  const items = req.body.items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      //[{price: "price_1JdybXK6cEl29YLIGPJZQvgE", quantity: req.body.quantity,}],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
    });

    res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//app.listen(8080);
app.listen(port, () => console.log("8080, listening..."));
