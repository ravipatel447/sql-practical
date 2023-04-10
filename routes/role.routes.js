const express = require("express");
const roleRouter = express.Router();
const roleController = require("../controllers/role.controller");

roleRouter.post("/role", roleController.createRole);
roleRouter.get("/role/:id", roleController.getRole);

module.exports = roleRouter;
