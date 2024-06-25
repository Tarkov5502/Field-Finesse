const express = require('express');
const sequelize = require('./config/database');

const customerRoutes = require('./routes/customerRoutes');
const workOrderRoutes = require('./routes/workOrderRoutes');

const app = express();

app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/work-orders', workOrderRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
