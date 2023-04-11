const rolePermission = require("../services/permissionAssign.service");

module.exports = {
  assignPermission: async (req, res, next) => {
    try {
      const assignedPermission = await rolePermission.AssignPermission(
        req.body
      );
      res.status(201).json({ data: { assignedPermission }, error: false });
    } catch (error) {
      next(error);
    }
  },
  assignBulkRolePermission: async (req, res, next) => {
    try {
      const roles = await rolePermission.assignBulkRolePermission(
        Array.isArray(req.body) ? req.body : []
      );
      res.status(201).json({ data: { roles }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getAllAssignedPermissions: async (req, res, next) => {
    try {
      const assignedPermissions = await rolePermission.getRolesPermissions();
      res.status(200).json({ data: { assignedPermissions }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getPermissionById: async (req, res, next) => {
    try {
      const assignedPermission = await rolePermission.findRolesPermissionById(
        req.params.roleId,
        req.params.permissionId
      );
      res.status(200).json({ data: { assignedPermission }, error: false });
    } catch (error) {
      next(error);
    }
  },
};
