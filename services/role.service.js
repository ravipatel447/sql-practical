const { Role, Permission, RolePermission } = require("../models");
module.exports = {
  createRole: async (body) => {
    const role = await Role.create(body);
    const permissions = await Permission.findAll({ raw: true });
    Promise.all(
      permissions.map(async (permission) => {
        await RolePermission.create({
          role_id: role.role_id,
          permission_id: permission.permission_id,
          create: false,
          read: false,
          update: false,
          delete: false,
        });
      })
    );
    return role;
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
