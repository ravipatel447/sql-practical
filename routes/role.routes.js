const express = require("express");
const roleRouter = express.Router();
const roleController = require("../controllers/role.controller");

roleRouter.post("/create", roleController.createRole);
// roleRouter.post("/bulk/create", roleController.createBulkRole);
roleRouter.get("/all", roleController.getRoles);
roleRouter.get("/:id", roleController.getRoleById);

module.exports = roleRouter;
