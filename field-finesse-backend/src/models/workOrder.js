const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkOrder = sequelize.define('WorkOrder', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  so_number: { type: DataTypes.STRING, allowNull: true },
  customer_id: { type: DataTypes.INTEGER, allowNull: true },
  customer_name: { type: DataTypes.STRING, allowNull: true },
  customer_po: { type: DataTypes.STRING, allowNull: true },
  garaganet_number: { type: DataTypes.STRING, allowNull: true },
  job_name: { type: DataTypes.STRING, allowNull: true },
  entered_by: { type: DataTypes.STRING, allowNull: true },
  salesman_name: { type: DataTypes.STRING, allowNull: true },
  door: { type: DataTypes.STRING, allowNull: true },
  total_sq_ft: { type: DataTypes.FLOAT, allowNull: true },
  hardware: { type: DataTypes.STRING, allowNull: true },
  operator: { type: DataTypes.STRING, allowNull: true },
  order_date: { type: DataTypes.DATE, allowNull: true },
  order_type: { type: DataTypes.STRING, allowNull: true },
  invoice_type: { type: DataTypes.STRING, allowNull: true },
  accountable: { type: DataTypes.STRING, allowNull: true },
  note: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  followup_status: { type: DataTypes.STRING, allowNull: true },
  total: { type: DataTypes.FLOAT, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'test_work_orders'
});

WorkOrder.associate = function(models) {
  WorkOrder.belongsTo(models.Customer, { foreignKey: 'customer_id' });
  WorkOrder.hasMany(models.Schedule, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Shipping, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Cost, { foreignKey: 'work_order_id' });
};

module.exports = WorkOrder;
