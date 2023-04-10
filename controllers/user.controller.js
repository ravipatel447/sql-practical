const User = require("../models/user.model");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
};
