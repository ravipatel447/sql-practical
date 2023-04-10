const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [0], msg: "please enter positive price" },
      max: { args: [1000000], msg: "please enter price lower than 1000000" },
    },
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE",
  },
});

module.exports = Product;
