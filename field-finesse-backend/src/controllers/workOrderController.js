const mysql = require('mysql2/promise');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: '192.168.1.163',
  user: 'tarkov5502',
  password: 'Eth@nol69',
  database: 'test_database'
});

// Create a new work order
exports.createWorkOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { description, status, schedule, shipping, cost } = req.body;
    await connection.beginTransaction();

    const [workOrderResult] = await connection.query('INSERT INTO work_orders (description, status) VALUES (?, ?)', [description, status]);
    const workOrderId = workOrderResult.insertId;

    await connection.query('INSERT INTO schedule (work_order_id, start_date, end_date) VALUES (?, ?, ?)', [workOrderId, schedule.start_date, schedule.end_date]);
    await connection.query('INSERT INTO shipping (work_order_id, address, city) VALUES (?, ?, ?)', [workOrderId, shipping.address, shipping.city]);
    await connection.query('INSERT INTO cost (work_order_id, amount, currency) VALUES (?, ?, ?)', [workOrderId, cost.amount, cost.currency]);

    await connection.commit();
    res.status(201).json({ workOrderId, description, status, schedule, shipping, cost });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

// Get all work orders with optional filters
exports.getWorkOrders = async (req, res) => {
  try {
    const filters = req.query;
    let query = 'SELECT * FROM work_orders WHERE 1=1';
    const queryParams = [];

    Object.keys(filters).forEach(key => {
      query += ` AND ${key} = ?`;
      queryParams.push(filters[key]);
    });

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
    const [workOrders] = await pool.query('SELECT * FROM work_orders WHERE id = ?', [id]);
    if (workOrders.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.status(200).json(workOrders[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a work order
exports.updateWorkOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { description, status, schedule, shipping, cost } = req.body;
    await connection.beginTransaction();

    const [workOrderResult] = await connection.query('UPDATE work_orders SET description = ?, status = ? WHERE id = ?', [description, status, id]);
    if (workOrderResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    await connection.query('UPDATE schedule SET start_date = ?, end_date = ? WHERE work_order_id = ?', [schedule.start_date, schedule.end_date, id]);
    await connection.query('UPDATE shipping SET address = ?, city = ? WHERE work_order_id = ?', [shipping.address, shipping.city, id]);
    await connection.query('UPDATE cost SET amount = ?, currency = ? WHERE work_order_id = ?', [cost.amount, cost.currency, id]);

    await connection.commit();
    res.status(200).json({ id, description, status, schedule, shipping, cost });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

// Delete a work order
exports.deleteWorkOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    await connection.beginTransaction();

    await connection.query('DELETE FROM schedule WHERE work_order_id = ?', [id]);
    await connection.query('DELETE FROM shipping WHERE work_order_id = ?', [id]);
    await connection.query('DELETE FROM cost WHERE work_order_id = ?', [id]);
    const [result] = await connection.query('DELETE FROM work_orders WHERE id = ?', [id]);
    
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
