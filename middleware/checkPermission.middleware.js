const { RolePermission, User, Permission, Role } = require("../models");
const checkPermission = (table, permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({
        include: {
          model: Role,
          include: {
            model: Permission,
            where: {
              permission_name: table,
            },
            through: {
              model: RolePermission,
              where: {
                [permission]: true,
              },
            },
          },
        },
        where: { user_id: req.user.user_id },
      });
      if (!user.toJSON().Role) {
        throw new Error(`You don't have permission to perform this task`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = checkPermission;
