require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db/sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  userRouter,
  orderRouter,
  permissionRouter,
  productRouter,
  roleRouter,
  rolePermissionRouter,
} = require("./routes/index.routes");
const PORT = process.env.PORT || 3000;
require("./models/assosiation");

app.use(cors());
app.use(bodyParser.json());

// routers
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/rolepermission", rolePermissionRouter);

// general error handler
app.use((error, req, res, next) => {
  res.status(400).json({ error: true, message: error.message });
});

// sequelize and server start
sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(() => {
  sequelize
    .sync({ alter: true })
    .then(function () {
      return sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log("we are listing at port ", PORT);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
