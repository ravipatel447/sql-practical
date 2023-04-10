const Permission = require("../models/permission.model");

module.exports = {
  createPermission: async (req, res, next) => {
    try {
      const permission = await Permission.create(req.body);
      res.send(permission);
    } catch (error) {
      next(error);
    }
  },
  getPermission: async (req, res, next) => {
    try {
      const permission = await Permission.findByPk(req.params.id);
      res.send(permission);
    } catch (error) {
      next(error);
    }
  },
};
