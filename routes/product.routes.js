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
productRouter.patch(
  "/update/:id",
  auth,
  checkPermission("PRODUCT", "update"),
  productController.updateProduct
);
productRouter.delete(
  "/delete/:id",
  auth,
  checkPermission("PRODUCT", "delete"),
  productController.deleteProduct
);
productRouter.get(
  "/all",
  auth,
  checkPermission("PRODUCT", "read"),
  productController.getProducts
);
productRouter.get(
  "/:id",
  auth,
  checkPermission("PRODUCT", "read"),
  productController.getProductById
);

module.exports = productRouter;
