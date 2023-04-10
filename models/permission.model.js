const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Permission = sequelize.define("Permission", {
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Permission;
