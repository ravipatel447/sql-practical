const { Product } = require("../models");
module.exports = {
  createProduct: async (body, user) => {
    const product = await Product.create({ ...body, seller_id: user.user_id });
    return product;
  },
  getProducts: async () => {
    const products = await Product.findAll();
    return products;
  },
  findById: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not Found");
    }
    return product;
  },
  updateProduct: async (id, body) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not Found");
    }
    await product.update({ ...body, seller_id: product.seller_id });
    return product;
  },
  deleteProduct: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not Found");
    }
    const deleted = await product.destroy();
    return deleted;
  },
};
