const { User, Token, Role } = require("../models");
const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (body) => {
    const user = await User.create(body);
    return user;
  },
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },
  findById: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not Found");
    }
    return user;
  },
  updateUser: async (id, body) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not Found");
    }
    await user.update({ ...body, role_id: user.role_id });
    return user;
  },
  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not Found");
    }
    const deleted = await user.destroy();
    return deleted;
  },
  generateAuthToken: async (user) => {
    const role = await Role.findByPk(user.role_id);
    const token = await jwt.sign(
      { user_id: user.user_id, role: role },
      jwtSecret,
      { expiresIn: "1d" }
    );
    await Token.create({ user_id: user.user_id, token });
    return token;
  },
};
