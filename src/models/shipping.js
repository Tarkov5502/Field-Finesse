const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipping = sequelize.define('Shipping', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: false },
  pickup_delivery: { type: DataTypes.STRING, allowNull: false },
  shipping_date: { type: DataTypes.DATE, allowNull: false },
  bo: { type: DataTypes.STRING, allowNull: false },
  distance_miles: { type: DataTypes.FLOAT, allowNull: false },
  time_minutes: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Shipping;
