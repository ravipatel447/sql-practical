const orderService = require("../services/order.service");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const order = await orderService.createOrder(req.body, req.user);
      res.status(201).json({
        data: order,
        error: false,
        message: "Your Order Has been created Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  changeStatusOfOrder: async (req, res, next) => {
    try {
      const order = await orderService.createOrder(req.body, req.user);
      res.status(201).json({
        data: order,
        error: false,
        message: "Your Order Has been created Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  getOrderById: async (req, res, next) => {
    try {
      const order = await orderService.findById(req.params.id);
      res.status(200).json({
        data: order,
        error: false,
      });
    } catch (error) {
      next(error);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json({
        data: orders,
        error: false,
      });
    } catch (error) {
      next(error);
    }
  },
};
