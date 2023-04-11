const { Role } = require("../models");
module.exports = {
  createRole: async (body) => {
    const role = await Role.create(body);
    return role;
  },
  createBulkRole: async (body) => {
    const roles = await Role.bulkCreate(body);
    return roles;
  },
  getRoles: async () => {
    const roles = await Role.findAll();
    return roles;
  },
  findRoleById: async (id) => {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error("Role not Found");
    }
    return role;
  },
  updateRole: async (id, body) => {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error("Role not Found");
    }
    await role.update({ role_name: body.role_name });
    return role;
  },
  deleteRole: async (id) => {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error("Role not Found");
    }
    const deleted = await role.destroy();
    return deleted;
  },
};
