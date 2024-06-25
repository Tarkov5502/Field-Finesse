const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Schedule = sequelize.define('Schedule', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: false },
  schedule_date: { type: DataTypes.DATE, allowNull: false },
  schedule_status: { type: DataTypes.STRING, allowNull: false },
  target_date: { type: DataTypes.DATE, allowNull: false },
  not_before: { type: DataTypes.DATE, allowNull: false },
  job_type: { type: DataTypes.STRING, allowNull: false },
  vendor: { type: DataTypes.STRING, allowNull: false },
  door_type: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  style: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  width: { type: DataTypes.FLOAT, allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false },
  dimensions: { type: DataTypes.STRING, allowNull: false },
  windows: { type: DataTypes.STRING, allowNull: false },
  windows_description: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Schedule;
