const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Tokens = sequelize.define("Tokens", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE",
  },
  token: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

module.exports = Tokens;
