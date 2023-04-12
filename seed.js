const { Role, Permission, RolePermission, User } = require("./models");
const sequelize = require("./db/sequelize");

const rolesSeed = async () => {
  return Role.bulkCreate([
    {
      role_name: "user",
    },
    {
      role_name: "admin",
    },
    {
      role_name: "seller",
    },
  ]);
};

const addAdmin = async () => {
  return User.create({
    name: "admin",
    email: "admin@test.com",
    password: "admin@test",
    address: "simform Solutions",
    role_id: 2,
  });
};

const permissionSeed = async () => {
  return Permission.bulkCreate([
    {
      permission_name: "USER",
    },
    {
      permission_name: "ORDER",
    },
    {
      permission_name: "PRODUCT",
    },
  ]);
};

const permissions = async () => {
  const queries = [
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '0',`read` = '1', `update` = '0', `delete` = '0' WHERE (`role_id` = '1') and (`permission_id` = '1')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '1') and (`permission_id` = '2')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `read` = '1' WHERE (`role_id` = '1') and (`permission_id` = '3')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '2') and (`permission_id` = '1')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '2') and (`permission_id` = '2')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '2') and (`permission_id` = '3')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '0', `read` = '1', `update` = '0' WHERE (`role_id` = '3') and (`permission_id` = '1')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '3') and (`permission_id` = '2')",
    "UPDATE `SQL_PRACTICAL`.`RolePermissions` SET `create` = '1', `read` = '1', `update` = '1', `delete` = '1' WHERE (`role_id` = '3') and (`permission_id` = '3')",
  ];
  return Promise.all(
    queries.map(async (q) => {
      return sequelize.query(q);
    })
  );
};
const assignPermissionToRole = async () => {
  let roles = await Role.findAll({ raw: true });
  let permissions = await Permission.findAll({ raw: true });
  return Promise.all(
    roles.map(async (role) => {
      return Promise.all(
        permissions.map(async (permission) => {
          return RolePermission.create({
            role_id: role.role_id,
            permission_id: permission.permission_id,
            create: false,
            read: false,
            update: false,
            delete: false,
          });
        })
      );
    })
  );
};

(async () => {
  await rolesSeed();
  await permissionSeed();
  await assignPermissionToRole();
  await permissions();
  await addAdmin();
})();
