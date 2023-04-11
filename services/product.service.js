const { Product, Product } = require("../models");
module.exports = {
  createProduct: async (body, user) => {
    const user = await Product.create({ ...body, seller_id: user.user_id });
    return user;
  },
  getProducts: async () => {
    const users = await Product.findAll();
    return users;
  },
  findById: async (id) => {
    const user = await Product.findByPk(id);
    if (!user) {
      throw new Error("Product not Found");
    }
    return user;
  },
  updateProduct: async (id, body) => {
    const user = await Product.findByPk(id);
    if (!user) {
      throw new Error("Product not Found");
    }
    await user.update({ ...body, role_id: user.role_id });
    return user;
  },
  deleteProduct: async (id) => {
    const user = await Product.findByPk(id);
    if (!user) {
      throw new Error("Product not Found");
    }
    const deleted = await user.destroy();
    return deleted;
  },
};
