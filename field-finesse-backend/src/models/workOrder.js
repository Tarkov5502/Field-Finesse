const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkOrder = sequelize.define('WorkOrder', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  so_number: { type: DataTypes.STRING, allowNull: false },
  customer_id: { type: DataTypes.INTEGER, allowNull: true },
  customer_name: { type: DataTypes.STRING, allowNull: false },
  customer_po: { type: DataTypes.STRING, allowNull: false },
  garaganet_number: { type: DataTypes.STRING, allowNull: false },
  job_name: { type: DataTypes.STRING, allowNull: false },
  entered_by: { type: DataTypes.STRING, allowNull: false },
  salesman_name: { type: DataTypes.STRING, allowNull: false },
  door: { type: DataTypes.STRING, allowNull: false },
  total_sq_ft: { type: DataTypes.FLOAT, allowNull: false },
  hardware: { type: DataTypes.STRING, allowNull: false },
  operator: { type: DataTypes.STRING, allowNull: false },
  order_date: { type: DataTypes.DATE, allowNull: false },
  order_type: { type: DataTypes.STRING, allowNull: false },
  invoice_type: { type: DataTypes.STRING, allowNull: false },
  accountable: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: false },
  followup_status: { type: DataTypes.STRING, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'work_orders'
});

WorkOrder.associate = function(models) {
  WorkOrder.belongsTo(models.Customer, { foreignKey: 'customer_id' });
  WorkOrder.hasMany(models.Schedule, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Shipping, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Cost, { foreignKey: 'work_order_id' });
};

module.exports = WorkOrder;
