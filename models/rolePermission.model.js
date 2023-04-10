const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Role = require("./role.model");
const Permission = require("./permission.model");

const RolePermission = sequelize.define("RolePermission", {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "role_id",
    },
    primaryKey: true,
    onDelete: "CASCADE",
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Permission,
      key: "permission_id",
    },
    primaryKey: true,
    onDelete: "CASCADE",
  },
  create: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  update: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = RolePermission;
