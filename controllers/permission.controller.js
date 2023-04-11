const permissionService = require("../services/permission.service");

module.exports = {
  createPermission: async (req, res, next) => {
    try {
      const permission = await permissionService.createPermission(req.body);
      res.status(201).json({ data: { permission }, error: false });
    } catch (error) {
      next(error);
    }
  },
  createBulkPermissions: async (req, res, next) => {
    try {
      const roles = await permissionService.createBulkPermissions(
        Array.isArray(req.body) ? req.body : []
      );
      res.status(201).json({ data: { roles }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getAllPermissions: async (req, res, next) => {
    try {
      const permissions = await permissionService.getPermissions();
      res.status(200).json({ data: { permissions }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getPermissionById: async (req, res, next) => {
    try {
      const permission = await permissionService.findPermissionById(
        req.params.id
      );
      res.status(200).json({ data: { permission }, error: false });
    } catch (error) {
      next(error);
    }
  },
};
