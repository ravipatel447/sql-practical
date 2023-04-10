const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller");

orderRouter.post("/order", orderController.createOrder);
orderRouter.get("/order/:id", orderController.getOrder);

module.exports = orderRouter;
