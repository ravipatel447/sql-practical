const Role = require("../models/role.model");

module.exports = {
  createRole: async (req, res, next) => {
    try {
      const role = await Role.create(req.body);
      res.send(role);
    } catch (error) {
      next(error);
    }
  },
  getRoles: async (req, res, next) => {
    try {
      const role = await Role.findAll();
      res.send(role);
    } catch (error) {
      next(error);
    }
  },
  getRoleById: async (req, res, next) => {
    try {
      const role = await Role.findByPk(req.params.id);
      res.send(role ? role : "role not Found");
    } catch (error) {
      next(error);
    }
  },
};
