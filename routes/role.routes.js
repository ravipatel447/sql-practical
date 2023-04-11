const express = require("express");
const roleRouter = express.Router();
const roleController = require("../controllers/role.controller");

roleRouter.post("/", roleController.createRole);
roleRouter.get("/", roleController.getRoles);
roleRouter.get("/:id", roleController.getRoleById);

module.exports = roleRouter;
