const {
  Order,
  OrderDetail,
  Permission,
  Product,
  Role,
  RolePermission,
  Token,
  User,
} = require("./index");

//---------------- role user relationship (one to many) -------------------------

Role.hasMany(User, { foreignKey: "role_id", onDelete: "CASCADE" });
User.belongsTo(Role, { foreignKey: "role_id", onDelete: "CASCADE" });

//---------------- role permission relationship (many to many) -------------------------
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  onDelete: "CASCADE",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
  onDelete: "CASCADE",
});

Role.hasMany(RolePermission, { foreignKey: "role_id", onDelete: "CASCADE" });
RolePermission.belongsTo(Role, { foreignKey: "role_id", onDelete: "CASCADE" });
Permission.hasMany(RolePermission, {
  foreignKey: "permission_id",
  onDelete: "CASCADE",
});
RolePermission.belongsTo(Permission, {
  foreignKey: "permission_id",
  onDelete: "CASCADE",
});

//---------------- user token reletionship (one to many) -------------------------
User.hasMany(Token, { foreignKey: "user_id", onDelete: "CASCADE" });
Token.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

//---------------- user order reletionship (one to many) -------------------------
User.hasMany(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });
Order.belongsTo(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });

//---------------- user product reletionship (one to many) -------------------------
User.hasMany(Product, { foreignKey: "seller_id", onDelete: "CASCADE" });
Product.belongsTo(User, { foreignKey: "seller_id", onDelete: "CASCADE" });

//---------------- order product reletionship (many to many) -----------------------

Order.belongsToMany(Product, {
  through: OrderDetail,
  foreignKey: "order_id",
  onDelete: "CASCADE",
});
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Order.hasMany(OrderDetail, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderDetail.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });

Product.hasMany(OrderDetail, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
OrderDetail.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

// ------------------------------------------------------------------------------------
