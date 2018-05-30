const fs = require("fs")

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "summit",
    password: process.env.DB_PASSWORD,
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "summit_test",
    host: process.env.DB_HOSTNAME,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME,
    Password: process.env.DB_PASSWORD,
    database: "summit_production",
    host: process.env.DB_HOSTNAME,
    dialect: "mysql"
  }
}
