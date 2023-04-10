const express = require("express");
const permissionRouter = express.Router();
const permissionController = require("../controllers/permission.controller");

permissionRouter.post("/permission", permissionController.createPermission);
permissionRouter.get("/permission/:id", permissionController.getPermission);

module.exports = permissionRouter;
