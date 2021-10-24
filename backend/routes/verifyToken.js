const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    if (!token) {
      res.status(401).send("Invalid Token");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = { userId: decodedToken.userId, userFarm: decodedToken.userFarm };
    next();
  } catch (err) {
    res.status(400).send("Access Denied");
    return next(err);
  }
};
