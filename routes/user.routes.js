const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

userRouter.post("/user", userController.createUser);
userRouter.get("/user/:id", userController.getUser);

module.exports = userRouter;
