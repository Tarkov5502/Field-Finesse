const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkOrder = sequelize.define('WorkOrder', {
  so_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_po: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  garaganet_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entered_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salesman_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  door: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_sq_ft: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hardware: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  order_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoice_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  followup_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  schedule_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  schedule_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  target_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  not_before: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vendor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  door_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  style: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  windows: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  windows_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pickup_delivery: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance_miles: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  time_minutes: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cost_profit_reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cost_profit_comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  labor_sales: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  labor_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  labor_margin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  material_sales: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  material_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  material_margin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sales_before_tax: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  margin_dollar: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  margin_percent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = WorkOrder;
