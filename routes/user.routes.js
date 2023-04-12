const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const checkPermission = require("../middleware/checkPermission.middleware");
userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.patch(
  "/changeRole",
  auth,
  checkPermission("USER", "update"),
  userController.changeRole
);
userRouter.get(
  "/all",
  auth,
  checkPermission("USER", "read"),
  userController.getUsers
);
userRouter.get(
  "/:id",
  auth,
  checkPermission("USER", "read"),
  userController.getUserById
);

module.exports = userRouter;
