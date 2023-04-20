const { User, Token, Role } = require("../models");
const { jwtSecret } = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (body) => {
    const user = await User.create(body);
    return user;
  },
  findByCredential: async (email, password) => {
    let user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Wrong email password combination");
    const checkingPassword = await bcrypt.compare(
      password,
      user.toJSON().password
    );
    if (!checkingPassword) throw new Error("Wrong email password combination");
    return user;
  },
  logoutUser: async (token, user) => {
    const Dtoken = await Token.findOne({
      where: {
        token,
        user_id: user.user_id,
      },
    });
    if (!Dtoken) throw new Error("we can not able to find token");
    await Dtoken.destroy();
    return true;
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
  changeRoleofUser: async (id, willRoleId) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not Found");
    }
    const role = await Role.findByPk(willRoleId);
    if (!role) {
      throw new Error("Role not Found");
    }
    await user.update({ role_id: willRoleId });
    return user;
  },
  deleteUser: async (user) => {
    const deletedUser = await User.findOne({
      user_id: user.user_id,
    });
    if (!deletedUser) {
      throw new Error("User not Found");
    }
    const deleted = await deletedUser.destroy();
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
