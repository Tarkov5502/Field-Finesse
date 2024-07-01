const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Schedule = sequelize.define('Schedule', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  work_order_id: { type: DataTypes.INTEGER, allowNull: true },
  schedule_date: { type: DataTypes.DATE, allowNull: true },
  schedule_status: { type: DataTypes.STRING, allowNull: true },
  target_date: { type: DataTypes.DATE, allowNull: true },
  not_before: { type: DataTypes.DATE, allowNull: true },
  job_type: { type: DataTypes.STRING, allowNull: true },
  vendor: { type: DataTypes.STRING, allowNull: true },
  door_type: { type: DataTypes.STRING, allowNull: true },
  model: { type: DataTypes.STRING, allowNull: true },
  style: { type: DataTypes.STRING, allowNull: true },
  color: { type: DataTypes.STRING, allowNull: true },
  width: { type: DataTypes.FLOAT, allowNull: true },
  height: { type: DataTypes.FLOAT, allowNull: true },
  dimensions: { type: DataTypes.STRING, allowNull: true },
  windows: { type: DataTypes.STRING, allowNull: true },
  windows_description: { type: DataTypes.TEXT, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'test_schedules'
});

Schedule.associate = function(models) {
  Schedule.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

module.exports = Schedule;
