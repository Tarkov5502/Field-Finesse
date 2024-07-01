const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipping = sequelize.define('Shipping', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: true },
  pickup_delivery: { type: DataTypes.STRING, allowNull: true },
  shipping_date: { type: DataTypes.DATE, allowNull: true },
  bo: { type: DataTypes.STRING, allowNull: true },
  distance_miles: { type: DataTypes.FLOAT, allowNull: true },
  time_minutes: { type: DataTypes.FLOAT, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'test_shippings'
});

Shipping.associate = function(models) {
  Shipping.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

module.exports = Shipping;
