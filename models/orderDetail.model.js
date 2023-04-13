const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Order = require("./order.model");
const Product = require("./product.model");
const OrderDetail = sequelize.define("OrderDetail", {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "order_id",
    },
    primaryKey: true,
    onDelete: "CASCADE",
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "product_id",
    },
    primaryKey: true,
    onDelete: "CASCADE",
  },
  productQuentity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = OrderDetail;
