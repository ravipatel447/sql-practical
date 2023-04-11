const sequelize = require("../db/sequelize");
const { DataTypes, Sequelize } = require("sequelize");
const Role = require("./role.model");
const bcrypt = require("bcryptjs");
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { args: [true], msg: "please enter valid email" },
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [4, 15], msg: "length of password is in between 4 to 15" },
    },
    set(value) {
      this.setDataValue("password", bcrypt.hash(value, 8));
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [10, 150],
        msg: "length of address is in between 10 to 150",
      },
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "role_id",
    },
    defaultValue: 1,
  },
});

module.exports = User;
