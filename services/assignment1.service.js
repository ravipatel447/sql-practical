const { Sequelize, Op } = require("sequelize");
const { User, Order, OrderDetail, Product } = require("../models");
module.exports = {
  assignment1: async () => {
    const users = await User.findAll({
      attributes: [["name", "Customer Name"]],
      include: {
        attributes: [
          "order_id",
          ["order_date", "Order Date"],
          [
            Sequelize.literal("DATEDIFF(expected_delivery_date,order_date)"),
            "expected delivery date",
          ],
        ],
        model: Order,
        include: {
          attributes: ["product_name", "price"],
          model: Product,
          through: {
            attributes: ["productQuentity"],
            module: OrderDetail,
          },
        },
      },
    });
    return users;
  },
  assignment2: async () => {
    const undeliverdOrders = await Order.findAll({
      where: {
        status: {
          [Op.not]: "delivered",
        },
      },
    });
    const MostRecent5Orders = await Order.findAll({
      order: ["order_date"],
      limit: 5,
    });
    const MostActive5Users = await Order.findAll({
      include: {
        attributes: ["name", "email"],
        model: User,
      },
      attributes: [[Sequelize.literal("COUNT(customer_id)"), "Total Orders"]],
      group: ["customer_id"],
      order: [["Total Orders", "DESC"]],
      limit: 5,
    });
    const InactiveUsers = await User.findAll({
      attributes: ["name", "email"],
      include: {
        model: Order,
        attributes: [],
      },
      where: {
        "$Orders.customer_id$": null,
      },
    });
    const MostPurchased = await OrderDetail.findAll({
      attributes: [
        "product_id",
        [Sequelize.literal("SUM(productQuentity)"), "productQuentity"],
      ],
      include: {
        attributes: ["product_name", "price"],
        model: Product,
      },
      group: ["product_id"],
    });
    const MostExpensiveOrder = await OrderDetail.findAll({
      attributes: [
        "order_id",
        [
          Sequelize.literal("SUM(Product.price * productQuentity)"),
          "total price",
        ],
      ],
      include: { attributes: [], model: Product },
      group: ["order_id"],
      order: [["total price", "DESC"]],
      limit: 1,
    });
    const MostChepestOrder = await OrderDetail.findAll({
      attributes: [
        "order_id",
        [
          Sequelize.literal("SUM(Product.price * productQuentity)"),
          "total price",
        ],
      ],
      include: { attributes: [], model: Product },
      group: ["order_id"],
      order: [["total price", "ASC"]],
      limit: 1,
    });
    return {
      undeliverdOrders,
      MostRecent5Orders,
      MostActive5Users,
      InactiveUsers,
      MostPurchased,
      MostExpensiveOrder,
      MostChepestOrder,
    };
  },
};
