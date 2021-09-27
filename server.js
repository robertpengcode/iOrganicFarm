require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
//app.use(express.static("public"));
app.use(
  cors({
    //origin: "*",
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.get("/", cors(), (req, res) => res.send("Hello!!! running..."));

app.post("/create-checkout-session", cors(), async (req, res) => {
  const items = req.body.items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
    });
    res.json({id: session.id, url: session.url});
    //res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => console.log(`listening on ${port}...`));
