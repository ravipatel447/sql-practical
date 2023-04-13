const productServices = require("../services/product.service");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const product = await productServices.createProduct(req.body, req.user);
      res.status(201).json({ data: { product }, error: false });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const product = await productServices.updateProduct(
        req.params.id,
        req.body,
        req.user
      );
      res.status(200).json({ data: { product }, error: false });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const deleted = await productServices.deleteProduct(
        req.params.id,
        req.user
      );
      res.status(200).json({
        message: deleted
          ? "Product has been delete successfully "
          : "Server Error",
        error: false,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const product = await productServices.findById(req.params.id);
      res.status(200).json({ data: { product }, error: false });
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const prodcuts = await productServices.getProducts();
      res.status(200).json({ data: { prodcuts }, error: false });
    } catch (error) {
      next(error);
    }
  },
};
