const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ship_to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ship_to_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lot_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Customer;
