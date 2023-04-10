const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const { jwtSecret } = require("../config");
const auth = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  const decode = jwt.verify(token, jwtSecret);

  try {
  } catch (error) {
    next(error.message);
  }
};
