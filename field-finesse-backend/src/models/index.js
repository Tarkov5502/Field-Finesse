const sequelize = require('../config/database');
const Customer = require('./customer');
const WorkOrder = require('./workOrder');
const Schedule = require('./schedule');
const Shipping = require('./shipping');
const Cost = require('./cost');

// Initialize associations
Customer.associate = function(models) {
  Customer.hasMany(models.WorkOrder, { foreignKey: 'customer_id' });
};

WorkOrder.associate = function(models) {
  WorkOrder.belongsTo(models.Customer, { foreignKey: 'customer_id' });
  WorkOrder.hasMany(models.Schedule, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Shipping, { foreignKey: 'work_order_id' });
  WorkOrder.hasMany(models.Cost, { foreignKey: 'work_order_id' });
};

Schedule.associate = function(models) {
  Schedule.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

Shipping.associate = function(models) {
  Shipping.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

Cost.associate = function(models) {
  Cost.belongsTo(models.WorkOrder, { foreignKey: 'work_order_id' });
};

// Store all models in an object
const models = {
  Customer,
  WorkOrder,
  Schedule,
  Shipping,
  Cost,
};

// Execute associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, models };
