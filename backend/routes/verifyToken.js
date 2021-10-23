const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //const token = req.header('auth-token');
  try {
    //const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('ck req', req);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send("Invalid Token");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // req.user = verified;
    req.userData = { userId: decodedToken.userId};
    next();
  } catch (err) {
    res.status(400).send("Access Denied");
    return next(err);
  }
};
