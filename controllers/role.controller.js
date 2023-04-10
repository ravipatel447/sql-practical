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
  getRole: async (req, res, next) => {
    try {
      const role = await Role.findByPk(req.params.id);
      res.send(role);
    } catch (error) {
      next(error);
    }
  },
};
