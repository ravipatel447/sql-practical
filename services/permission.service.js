const { Permission } = require("../models");
module.exports = {
  createPermission: async (body) => {
    const permission = await Permission.create(body);
    return permission;
  },
  createBulkPermissions: async (body) => {
    const permissions = await Permission.bulkCreate(body);
    return permissions;
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
