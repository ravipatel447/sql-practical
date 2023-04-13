const { Order, OrderDetail, Product } = require("../models");
module.exports = {
  createOrder: async (body, user) => {
    const order = await Order.create({
      order_date: new Date(),
      expected_delivery_date: new Date(
        new Date().getTime() +
          3 * (1000 * 60 * 60 * 24) +
          Math.random() * 12 * 1000 * 60 * 60
      ),
      status: "pending",
      customer_id: user.user_id,
    });
    const products = body.products.map((product) => ({
      product_id: product.product_id,
      productQuentity: product.qnt,
      order_id: order.order_id,
    }));
    const orderDeatils = await OrderDetail.bulkCreate(products);
    if (!orderDeatils) throw new Error("select valid product ids");
    return order;
  },
  getOrders: async () => {
    const orders = await Order.findAll({
      include: {
        model: Product,
        through: {
          model: OrderDetail,
        },
      },
    });
    return orders;
  },
  findById: async (id) => {
    const order = await Order.findOne({
      where: { order_id: id },
      include: {
        model: Product,
        through: {
          model: OrderDetail,
        },
      },
    });
    if (!order) {
      throw new Error("Order not Found");
    }
    return order;
  },
  updateOrder: async (id, body) => {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not Found");
    }
    await order.update({ status: body.status });
    return order;
  },
  // ----------------- Order shoud not be deleted after placed, it can be canceled in status -----------------

  // deleteOrder: async (id) => {
  //   const order = await Order.findByPk(id);
  //   if (!order) {
  //     throw new Error("Order not Found");
  //   }
  //   const deleted = await order.destroy();
  //   return deleted;
  // },
};
