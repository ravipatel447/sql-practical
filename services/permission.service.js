const { Permission, Role, RolePermission } = require("../models");
module.exports = {
  createPermission: async (body) => {
    const permission = await Permission.create(body);
    const roles = await Role.findAll();
    Promise.all(
      roles.map(async (role) => {
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
    return permission;
  },
  getPermissions: async () => {
    const permissions = await Permission.findAll();
    return permissions;
  },
  findPermissionById: async (id) => {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error("Permission not Found");
    }
    return permission;
  },
  updatePermission: async (id, body) => {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error("Permission not Found");
    }
    await permission.update({ permission_name: body.permission_name });
    return permission;
  },
  deletePermission: async (id) => {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error("Permission not Found");
    }
    const deleted = await permission.destroy();
    return deleted;
  },
};
