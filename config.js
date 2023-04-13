require("dotenv").config();
module.exports = {
  db: {
    database: process.env.DATABASE,
    host: process.env.HOST,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    dialect: process.env.DIALECT,
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
