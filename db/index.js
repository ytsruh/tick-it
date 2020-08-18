"use strict";
const Sequelize = require("sequelize");

//Create new sequelize object
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // disable logging; default: console.log
    logging: false,
    dialectOptions: {
      //tedious/mssql specific options
      options: {
        encrypt: true,
      },
    },
    define: {
      timestamps: true,
    },
  }
);

//Import models
const User = require("./models/User")(sequelize, Sequelize);
const Ticket = require("./models/Ticket")(sequelize, Sequelize);

//Create relationships by calling the associate functions
User.associate(Ticket);
Ticket.associate(User);

//Connect to DB
// Model.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// Model.sync({ force: true }) - This creates the table, dropping it first if it already existed
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection to Azure SQL has been established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Ticket,
};
