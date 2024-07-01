const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cost = sequelize.define('Cost', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: true },
  cost_profit_reason: { type: DataTypes.TEXT, allowNull: true },
  cost_profit_comment: { type: DataTypes.TEXT, allowNull: true },
  labor_sales: { type: DataTypes.FLOAT, allowNull: true },
  labor_cost: { type: DataTypes.FLOAT, allowNull: true },
  labor_margin: { type: DataTypes.FLOAT, allowNull: true },
  material_sales: { type: DataTypes.FLOAT, allowNull: true },
  material_cost: { type: DataTypes.FLOAT, allowNull: true },
  material_margin: { type: DataTypes.FLOAT, allowNull: true },
  sales_before_tax: { type: DataTypes.FLOAT, allowNull: true },
  total_cost: { type: DataTypes.FLOAT, allowNull: true },
  margin_dollar: { type: DataTypes.FLOAT, allowNull: true },
  margin_percent: { type: DataTypes.FLOAT, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'test_costs'
});

Cost.associate = function(models) {
  Cost.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

module.exports = Cost;
