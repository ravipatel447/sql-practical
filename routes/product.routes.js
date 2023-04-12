const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const checkPermission = require("../middleware/checkPermission.middleware");

productRouter.post(
  "/create",
  auth,
  checkPermission("PRODUCT", "create"),
  productController.createProduct
);
productRouter.get(
  "/:id",
  auth,
  checkPermission("PRODUCT", "read"),
  productController.getProductById
);
productRouter.get(
  "/all",
  auth,
  checkPermission("PRODUCT", "read"),
  productController.getProducts
);

module.exports = productRouter;
