const roleService = require("../services/role.service");

module.exports = {
  createRole: async (req, res, next) => {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json({ data: { role }, error: false });
    } catch (error) {
      next(error);
    }
  },
  createBulkRole: async (req, res, next) => {
    try {
      const roles = await roleService.createBulkRole(
        Array.isArray(req.body) ? req.body : []
      );
      res.status(201).json({ data: { roles }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getRoles: async (req, res, next) => {
    try {
      const roles = await roleService.getRoles();
      res.status(201).json({ data: roles, error: false });
    } catch (error) {
      next(error);
    }
  },
  getRoleById: async (req, res, next) => {
    try {
      const role = await roleService.findRoleById(req.params.id);
      res.status(201).json({ data: role, error: false });
    } catch (error) {
      next(error);
    }
  },
};
