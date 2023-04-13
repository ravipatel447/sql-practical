const sequelize = require("../db/sequelize");
const { DataTypes, Sequelize } = require("sequelize");
const User = require("./user.model");
const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  expected_delivery_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "shipped", "delivered"),
    allowNull: false,
    defaultValue: "pending",
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE",
  },
});

module.exports = Order;
