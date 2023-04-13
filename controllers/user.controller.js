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
      const user = await userService.findByCredential(
        req.body.email,
        req.body.password
      );
      const token = await userService.generateAuthToken(user);
      res.status(200).json({ data: { user, token }, error: false });
    } catch (error) {
      next(error);
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      const logout = await userService.logoutUser(req.token, req.user);
      res.status(200).json({
        data: {
          message: logout
            ? "User has been logged Out"
            : "Failed to Logging out",
        },
        error: false,
      });
    } catch (error) {
      next(error);
    }
  },
  changeRole: async (req, res, next) => {
    try {
      const user = await userService.changeRoleofUser(
        req.body.user_id,
        req.body.role_id
      );
      res.status(200).json({ data: { user }, error: false });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const deleted = await userService.deleteUser(req.user);
      res
        .status(200)
        .json({
          message: deleted
            ? "User has been delete successfully"
            : "server error",
          error: false,
        });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.findById(req.params.id);
      res.status(200).json({ data: user, error: false });
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ data: users, error: false });
    } catch (error) {
      next(error);
    }
  },
};
