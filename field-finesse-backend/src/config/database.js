const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_database', 'tarkov5502', 'Eth@nol69', {
  host: '192.168.1.163',
  dialect: 'mysql',
});

module.exports = sequelize;
