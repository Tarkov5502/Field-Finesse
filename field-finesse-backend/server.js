const express = require('express');
const { sequelize, models } = require('./src/models/index');

const customerRoutes = require('./src/routes/customerRoutes');
const workOrderRoutes = require('./src/routes/workOrderRoutes');
// Import other routes here...

const app = express();

app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/work-orders', workOrderRoutes);
// Use other routes here...

// Sync database and start the server
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;

