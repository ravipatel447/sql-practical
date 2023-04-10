const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Tokens = sequelize.define("Tokens", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    references: {
      model: User,
      key: "user_id",
    },
    primaryKey: true,
    onDelete: "CASCADE",
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Tokens;
