const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: '192.168.1.163',
  user: 'tarkov5502',
  password: 'Eth@nol69',
  database: 'test_database'
});

// Middleware for validation
const validateWorkOrder = [
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('status').isString().notEmpty().withMessage('Status is required'),
  // Add more validations as needed
];

// Create a new work order
exports.createWorkOrder = [
  validateWorkOrder,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const connection = await pool.getConnection();
    try {
      const { description, status, schedule, shipping, cost } = req.body;
      await connection.beginTransaction();

      const [workOrderResult] = await connection.query('INSERT INTO test_work_orders (description, status) VALUES (?, ?)', [description, status]);
      const workOrderId = workOrderResult.insertId;

      await connection.query('INSERT INTO test_schedules (work_order_id, start_date, end_date) VALUES (?, ?, ?)', [workOrderId, schedule.start_date, schedule.end_date]);
      await connection.query('INSERT INTO test_shippings (work_order_id, address, city) VALUES (?, ?, ?)', [workOrderId, shipping.address, shipping.city]);
      await connection.query('INSERT INTO test_costs (work_order_id, amount, currency) VALUES (?, ?, ?)', [workOrderId, cost.amount, cost.currency]);

      await connection.commit();
      res.status(201).json({ workOrderId, description, status, schedule, shipping, cost });
    } catch (err) {
      await connection.rollback();
      res.status(500).json({ error: err.message });
    } finally {
      connection.release();
    }
  }
];

// Get all work orders with pagination and sorting
exports.getWorkOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC', ...filters } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM test_work_orders WHERE 1=1';
    const queryParams = [];

    Object.keys(filters).forEach(key => {
      query += ` AND ${key} = ?`;
      queryParams.push(filters[key]);
    });

    query += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    const [workOrders] = await pool.query(query, queryParams);
    res.status(200).json(workOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a work order by ID
exports.getWorkOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [workOrders] = await pool.query('SELECT * FROM test_work_orders WHERE id = ?', [id]);
    if (workOrders.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.status(200).json(workOrders[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a work order
exports.updateWorkOrder = [
  validateWorkOrder,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const connection = await pool.getConnection();
    try {
      const { id } = req.params;
      const { description, status, schedule, shipping, cost } = req.body;
      await connection.beginTransaction();

      const [workOrderResult] = await connection.query('UPDATE test_work_orders SET description = ?, status = ? WHERE id = ?', [description, status, id]);
      if (workOrderResult.affectedRows === 0) {
        return res.status(404).json({ error: 'Work order not found' });
      }

      await connection.query('UPDATE test_schedules SET start_date = ?, end_date = ? WHERE work_order_id = ?', [schedule.start_date, schedule.end_date, id]);
      await connection.query('UPDATE test_shippings SET address = ?, city = ? WHERE work_order_id = ?', [shipping.address, shipping.city, id]);
      await connection.query('UPDATE test_costs SET amount = ?, currency = ? WHERE work_order_id = ?', [cost.amount, cost.currency, id]);

      await connection.commit();
      res.status(200).json({ id, description, status, schedule, shipping, cost });
    } catch (err) {
      await connection.rollback();
      res.status(500).json({ error: err.message });
    } finally {
      connection.release();
    }
  }
];

// Partially update a work order
exports.partialUpdateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE test_work_orders SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    res.status(200).json({ id, ...updates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a work order
exports.deleteWorkOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    await connection.beginTransaction();

    await connection.query('DELETE FROM test_schedules WHERE work_order_id = ?', [id]);
    await connection.query('DELETE FROM test_shippings WHERE work_order_id = ?', [id]);
    await connection.query('DELETE FROM test_costs WHERE work_order_id = ?', [id]);
    const [result] = await connection.query('DELETE FROM test_work_orders WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    await connection.commit();
    res.status(204).send();
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};



