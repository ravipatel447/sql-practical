const express = require("express");
const permissionRouter = express.Router();
const permissionController = require("../controllers/permission.controller");

permissionRouter.post("/", permissionController.createPermission);
permissionRouter.get("/all", permissionController.getAllPermissions);
permissionRouter.get("/:id", permissionController.getPermissionById);

module.exports = permissionRouter;
