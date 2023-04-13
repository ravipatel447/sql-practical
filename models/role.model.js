const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Role = sequelize.define("Role", {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
module.exports = Role;
