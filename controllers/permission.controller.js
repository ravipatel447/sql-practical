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
  getAllPermissions: async (req, res, next) => {
    try {
      const permission = await Permission.findAll();
      res.send(permission);
    } catch (error) {
      next(error);
    }
  },
  getPermissionById: async (req, res, next) => {
    try {
      const permission = await Permission.findByPk(req.params.id);
      res.send(
        permission ? permission : `No Permission found on id ${req.params.id}`
      );
    } catch (error) {
      next(error);
    }
  },
};
