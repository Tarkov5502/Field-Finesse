const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('field_finesse_db', 'tarkov5502', 'Eth@nol69', {
  host: '192.168.1.163',
  dialect: 'mysql',
});

module.exports = sequelize;
