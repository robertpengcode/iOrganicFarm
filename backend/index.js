require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

//Import Routes
const authRoute = require("./routes/auth");
const testRoute = require("./routes/test");
const stripeRoute = require("./routes/stripe");

//connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));

//Middleware
app.use(express.json());

app.use(
  cors({
    //origin: "*",
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  })
);

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/test", testRoute);
app.use("/", stripeRoute);

app.get("/", cors(), (req, res) => res.send("Hello!!! running..."));

app.listen(port, () => console.log(`listening on ${port}...`));
