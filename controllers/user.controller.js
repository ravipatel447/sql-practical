const userService = require("../services/user.service");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      const token = await userService.generateAuthToken(user);
      res.status(201).json({ data: { user, token }, error: false });
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      const token = await userService.generateAuthToken(user);
      res.status(201).json({ data: { user, token }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.findById(req.params.id);
      res.status(201).json({ data: user, error: false });
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(201).json({ data: users, error: false });
    } catch (error) {
      next(error);
    }
  },
};
