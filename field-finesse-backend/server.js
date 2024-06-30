const express = require('express');
const { sequelize, models } = require('./src/models/index');

const customerRoutes = require('./src/routes/customerRoutes');
const workOrderRoutes = require('./src/routes/workOrderRoutes');

const app = express();

app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/workorders', workOrderRoutes);

sequelize.sync({ alter: true })  // Changed from force: true to alter: true to avoid data loss
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, '192.168.1.163', () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
