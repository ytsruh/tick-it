"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "tickit-Ticket",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      urgent: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "Tickit_Tickets", //Set custom table name,
      timestamps: true,
    }
  );
  Ticket.associate = (model) => {
    // Create relationship to the model passed into the function
    // By default, the association is considered optional. In other words, in our example, the fooId is allowed to be null, meaning that one Bar can exist without a Foo. Changing this is just a matter of specifying allowNull: false in the foreign key options
    Ticket.belongsTo(model, {
      foreignKey: {
        allowNull: false,
      },
    }); // Ticket will get the accessors get and set
  };
  return Ticket;
};
