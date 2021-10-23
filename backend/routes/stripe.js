const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors");

router.post("/create-checkout-session", cors(), async (req, res) => {
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
      res.json({ id: session.id, url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  module.exports = router;


