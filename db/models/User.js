"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(["user", "engineer"]),
        defaultValue: "user",
      },
    },
    {
      tableName: "Tickit_Users", //Set custom table name
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  User.associate = (model) => {
    // Create relationship to the model passed into the function
    // By default, the association is considered optional. In other words, in our example, the fooId is allowed to be null, meaning that one Bar can exist without a Foo. Changing this is just a matter of specifying allowNull: false in the foreign key options
    User.hasMany(model, {
      foreignKey: {
        allowNull: false,
      },
    }); // User will get the accessors get and set
  };
  User.prototype.validPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };
  return User;
};
