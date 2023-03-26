const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  next();
};

module.exports = { auth };
