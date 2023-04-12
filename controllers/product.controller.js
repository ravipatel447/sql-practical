const productServices = require("../services/product.service");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const product = await productServices.createProduct(req.body, req.user);
      res.send(product);
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const prodcut = await productServices.findById(req.params.id);
      res.send(prodcut);
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const prodcuts = await productServices.getProducts();
      res.send(prodcuts);
    } catch (error) {
      next(error);
    }
  },
};
