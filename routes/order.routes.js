const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");
const checkPermission = require("../middleware/checkPermission.middleware");

orderRouter.post(
  "/create",
  auth,
  checkPermission("ORDER", "create"),
  orderController.createOrder
);
orderRouter.patch(
  "/update/status",
  auth,
  checkPermission("ORDER", "update"),
  orderController.createOrder
);
orderRouter.get(
  "/all",
  auth,
  checkPermission("ORDER", "read"),
  orderController.getOrders
);
orderRouter.get(
  "/:id",
  auth,
  checkPermission("ORDER", "read"),
  orderController.getOrderById
);

module.exports = orderRouter;
