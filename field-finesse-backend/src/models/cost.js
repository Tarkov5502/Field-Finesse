const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cost = sequelize.define('Cost', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: false },
  cost_profit_reason: { type: DataTypes.TEXT, allowNull: false },
  cost_profit_comment: { type: DataTypes.TEXT, allowNull: false },
  labor_sales: { type: DataTypes.FLOAT, allowNull: false },
  labor_cost: { type: DataTypes.FLOAT, allowNull: false },
  labor_margin: { type: DataTypes.FLOAT, allowNull: false },
  material_sales: { type: DataTypes.FLOAT, allowNull: false },
  material_cost: { type: DataTypes.FLOAT, allowNull: false },
  material_margin: { type: DataTypes.FLOAT, allowNull: false },
  sales_before_tax: { type: DataTypes.FLOAT, allowNull: false },
  total_cost: { type: DataTypes.FLOAT, allowNull: false },
  margin_dollar: { type: DataTypes.FLOAT, allowNull: false },
  margin_percent: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Cost;
