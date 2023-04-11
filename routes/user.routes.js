const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.createUser);
userRouter.get("/all", userController.getUsers);
userRouter.get("/:id", userController.getUserById);

module.exports = userRouter;
