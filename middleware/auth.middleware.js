const jwt = require("jsonwebtoken");
const { Token, User } = require("../models");
const { jwtSecret } = require("../config");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decode = jwt.verify(token, jwtSecret);
    if (!decode) throw new Error();
    const user = await User.findByPk(decode.user_id);
    if (!user) throw new Error();
    const find = await Token.findOne({
      where: { user_id: user.user_id, token },
    });
    if (!find) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    error.message = "unauthorized";
    next(error);
  }
};

module.exports = auth;
