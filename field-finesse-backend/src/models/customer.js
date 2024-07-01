const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  client_type: { type: DataTypes.STRING, allowNull: true },  // Make nullable
  subtype: { type: DataTypes.STRING, allowNull: true },      // Make nullable
  ship_to: { type: DataTypes.STRING, allowNull: true },      // Make nullable
  ship_to_address: { type: DataTypes.STRING, allowNull: true },  // Make nullable
  phone_number: { type: DataTypes.STRING, allowNull: true }, // Make nullable
  email: { type: DataTypes.STRING, allowNull: false },
  lot_number: { type: DataTypes.STRING, allowNull: true },   // Make nullable
  createdAt: { type: DataTypes.DATE, allowNull: true },      // Make nullable
  updatedAt: { type: DataTypes.DATE, allowNull: true }       // Make nullable
}, {
  tableName: 'test_customers'
});

Customer.associate = function(models) {
  Customer.hasMany(models.WorkOrder, { foreignKey: 'customer_id' });
};

module.exports = Customer;

