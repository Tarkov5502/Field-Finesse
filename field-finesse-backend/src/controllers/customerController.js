const mysql = require('mysql2/promise');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: '192.168.1.163',
  user: 'tarkov5502',
  password: 'Eth@nol69',
  database: 'test_database'
});

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query('INSERT INTO test_customers (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers with optional filters
exports.getCustomers = async (req, res) => {
  try {
    const filters = req.query;
    let query = 'SELECT * FROM test_customers WHERE 1=1';
    const queryParams = [];

    Object.keys(filters).forEach(key => {
      query += ` AND ${key} = ?`;
      queryParams.push(filters[key]);
    });

    const [customers] = await pool.query(query, queryParams);
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const [customers] = await pool.query('SELECT * FROM test_customers WHERE id = ?', [id]);
    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customers[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const [result] = await pool.query('UPDATE test_customers SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM test_customers WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

