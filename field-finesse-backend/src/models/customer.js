const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  client_type: { type: DataTypes.STRING, allowNull: false },
  subtype: { type: DataTypes.STRING, allowNull: false },
  ship_to: { type: DataTypes.STRING, allowNull: false },
  ship_to_address: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  lot_number: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'customers'
});

Customer.associate = function(models) {
  Customer.hasMany(models.WorkOrder, { foreignKey: 'customer_id' });
};

module.exports = Customer;
