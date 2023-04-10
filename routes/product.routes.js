const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");

productRouter.post("/product", productController.createProduct);
productRouter.get("/product/:id", productController.getProduct);

module.exports = productRouter;
