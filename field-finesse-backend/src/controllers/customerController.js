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
const validateCustomer = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  // Add more validations as needed
];

// Create a new customer
exports.createCustomer = [
  validateCustomer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, client_type, subtype, ship_to, ship_to_address, phone_number, lot_number, createdAt, updatedAt } = req.body;
      const [result] = await pool.query(
        'INSERT INTO test_customers (name, email, client_type, subtype, ship_to, ship_to_address, phone_number, lot_number, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, client_type, subtype, ship_to, ship_to_address, phone_number, lot_number, createdAt, updatedAt]
      );
      res.status(201).json({ id: result.insertId, name, email, client_type, subtype, ship_to, ship_to_address, phone_number, lot_number, createdAt, updatedAt });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// Get all customers with pagination and sorting
exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC', ...filters } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM test_customers WHERE 1=1';
    const queryParams = [];

    Object.keys(filters).forEach(key => {
      query += ` AND ${key} = ?`;
      queryParams.push(filters[key]);
    });

    query += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

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
exports.updateCustomer = [
  validateCustomer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, client_type, subtype, ship_to, ship_to_address, phone_number, email, lot_number, createdAt, updatedAt } = req.body;
      const [result] = await pool.query(
        'UPDATE test_customers SET name = ?, client_type = ?, subtype = ?, ship_to = ?, ship_to_address = ?, phone_number = ?, email = ?, lot_number = ?, createdAt = ?, updatedAt = ? WHERE id = ?',
        [name, client_type, subtype, ship_to, ship_to_address, phone_number, email, lot_number, createdAt, updatedAt, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      res.status(200).json({ id, name, client_type, subtype, ship_to, ship_to_address, phone_number, email, lot_number, createdAt, updatedAt });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// Partially update a customer
exports.partialUpdateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE test_customers SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({ id, ...updates });
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

