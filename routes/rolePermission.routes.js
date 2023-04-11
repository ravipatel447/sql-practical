const express = require("express");
const rolePermissionRouter = express.Router();
const rolePermissionController = require("../controllers/rolePermission.controller");

rolePermissionRouter.post("/assign", rolePermissionController.assignPermission);
rolePermissionRouter.post(
  "/bulk/assign",
  rolePermissionController.assignBulkRolePermission
);
rolePermissionRouter.get(
  "/all",
  rolePermissionController.getAllAssignedPermissions
);
rolePermissionRouter.get(
  "/:roleId/:permissionId",
  rolePermissionController.getPermissionById
);

module.exports = rolePermissionRouter;
