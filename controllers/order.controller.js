const Order = require("../models/order.model");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const order = await Order.create(req.body);
      res.send(order);
    } catch (error) {
      next(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.id);
      res.send(order);
    } catch (error) {
      next(error);
    }
  },
};
