const Product = require("../models/product.model");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const prodcut = await Product.findByPk(req.params.id);
      res.send(prodcut);
    } catch (error) {
      next(error);
    }
  },
};
