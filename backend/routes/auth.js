const router = require("express").Router();
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { signupValidation } = require("./../validation");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).send(users);
    } else {
      return res.status(400).send({ errorMessage: "User not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/signup", async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error)
    return res.status(400).send({ errorMessage: error.details[0].message });
  //if (error) return res.status(400).send(error.details[0].message);
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (!!emailExist)
      return res
        .status(400)
        .send({ errorMessage: "Email already exists! Please sign in." });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/signin", async (req, res, next) => {
  let user = null;
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ errorMessage: "Email is wrong!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send({ errorMessage: "Password is wrong!" });
  }
  //res.send("sign in in");
  let token;
  try {
    token = jwt.sign(
      { _id: user._id, userFarm: user.userFarm, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    console.log(err);
    return next(err);
  }
  //res.header("auth-token", token).send(token);
  console.log(token);
  //res.status(201).send({ token: token });
  res
    .status(201)
    .json({
      userId: user._id,
      userFarm: user.userFarm,
      isAdmin: user.isAdmin,
      token: token,
    });
});

module.exports = router;
