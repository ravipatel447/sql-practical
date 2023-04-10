require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db/sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");
const permissionRouter = require("./routes/permission.routes");
const productRouter = require("./routes/product.routes");
const roleRouter = require("./routes/role.routes");

app.use(cors());
app.use(bodyParser.json());

app.use(roleRouter);
app.use(permissionRouter);
app.use(userRoutes);
app.use(orderRouter);
app.use(productRouter);

app.use((error, req, res, next) => {
  res.send(error.message);
});
const PORT = process.env.PORT || 3000;

sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(() => {
  sequelize
    .sync({ force: true })
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
