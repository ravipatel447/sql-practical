const { RolePermission, Role, Permission } = require("../models");
module.exports = {
  AssignPermission: async (body) => {
    const role = await Role.findByPk(body.role_id);
    if (!role) throw new Error("Role cannot found");
    const permission = await Permission.findByPk(body.permission_id);
    if (!permission) throw new Error("Permission cannot found");
    const rolePermission = await RolePermission.create(body);
    return rolePermission;
  },
  assignBulkRolePermission: async (body) => {
    const roles = await RolePermission.bulkCreate(body);
    if (!roles) throw new Error("some feield are wrong");
    return roles;
  },
  getRolesPermissions: async () => {
    const rolePermissions = await RolePermission.findAll();
    return rolePermissions;
  },
  findRolesPermissionById: async (role_id, permission_id) => {
    const rolePermission = await RolePermission.findOne({
      where: { role_id, permission_id },
    });
    if (!rolePermission) {
      throw new Error("Role Permission not Found");
    }
    return rolePermission;
  },
  updateRolesPermission: async (body) => {
    const rolePermission = await RolePermission.findOne({
      where: { role_id: body.role_id, permission_id: body.permission_id },
    });
    if (!rolePermission) {
      throw new Error("Role Permission not Found");
    }
    await rolePermission.update(body);
    return rolePermission;
  },
  deletePermission: async (role_id, permission_id) => {
    const rolePermission = await RolePermission.findOne({
      where: { role_id, permission_id },
    });
    if (!rolePermission) {
      throw new Error("Role Permission not Found");
    }
    const deleted = await rolePermission.destroy();
    return deleted;
  },
};
