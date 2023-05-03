require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

//Import Routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const exchangeRoute = require("./routes/exchange");
const stripeRoute = require("./routes/stripe");

//connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));

//rewrite for deploying to Cyclic (05/03/2023)
//MongoDB connections work a little differently with serverless.
//To avoid bugs, connections should be established before a server's listen method is called.
//To make sure this happens every time, call the listen method in the connect callback.
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DB_CONNECT);
//   } catch (error) {
//     console.log("error:", error);
//     process.exit(1);
//   }
// };

//Middleware
app.use(express.json());

// app.use(
//   cors({
//     //origin: "*",
//     origin: "http://localhost:3000",
//     methods: ["POST", "GET"],
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT"
  );
  next();
});

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/exchange", exchangeRoute);
app.use("/", stripeRoute);

app.get("/", cors(), (req, res) => res.send("Hello!!! running..."));

app.listen(port, () => console.log(`listening on ${port}...`));
//rewrite for deploying to Cyclic (05/03/2023)
// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`listening on ${port}...`);
//   });
// });
