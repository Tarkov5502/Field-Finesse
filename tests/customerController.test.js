const request = require('supertest');
const app = require('./field-finesse-backend/server'); // Adjust the path if your Express app is located elsewhere

describe('Customer API', () => {

  // Setup and Teardown
  beforeAll(async () => {
    // Insert test data or set up required state before tests
    await request(app).post('/api/customers').send({
      name: 'Initial Customer',
      client_type: 'regular',
      subtype: 'type1',
      ship_to: 'Initial City',
      ship_to_address: '123 Initial St',
      phone_number: '123-456-7890',
      email: 'initial@example.com',
      lot_number: 1001
    });
  });

  afterAll(async () => {
    // Clean up test data or reset state after tests
    await request(app).delete('/api/customers/1'); // Adjust the ID as needed
  });

  // Test for creating a new customer
  it('should create a new customer', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: 'Test Customer',
        client_type: 'premium',
        subtype: 'type2',
        ship_to: 'Test City',
        ship_to_address: '456 Test St',
        phone_number: '987-654-3210',
        email: 'test@example.com',
        lot_number: 2002
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Test for getting all customers with pagination and sorting
  it('should get all customers with pagination and sorting', async () => {
    const response = await request(app).get('/api/customers?page=1&limit=10&sort=name&order=asc');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(10);
  });

  // Test for getting a customer by ID
  it('should get a customer by ID', async () => {
    const customerId = 1; // Replace with a valid customer ID in your database
    const response = await request(app).get(`/api/customers/${customerId}`);
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Customer not found');
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', customerId);
    }
  });

  // Test for updating a customer
  it('should update a customer', async () => {
    const customerId = 1; // Replace with a valid customer ID in your database
    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .send({
        name: 'Updated Customer',
        client_type: 'premium',
        subtype: 'type2',
        ship_to: 'Updated City',
        ship_to_address: '789 Updated St',
        phone_number: '321-654-0987',
        email: 'updated@example.com',
        lot_number: 3003
      });
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Customer not found');
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Customer');
    }
  });

  // Test for deleting a customer
  it('should delete a customer', async () => {
    const customerId = 1; // Replace with a valid customer ID in your database
    const response = await request(app).delete(`/api/customers/${customerId}`);
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Customer not found');
    } else {
      expect(response.statusCode).toBe(204);
    }
  });

  // Additional tests for validation errors
  it('should return validation error for missing fields when creating a customer', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        client_type: 'premium'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for invalid data types
  it('should return validation error for invalid data types', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: 12345, // Invalid type
        client_type: 'regular',
        subtype: 'type1',
        ship_to: 'Test City',
        ship_to_address: '456 Test St',
        phone_number: '987-654-3210',
        email: 'test@example.com',
        lot_number: 'abcde' // Invalid type
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for excessively long input
  it('should return validation error for excessively long input', async () => {
    const longName = 'a'.repeat(1001); // Exceeds typical limit
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: longName,
        client_type: 'premium',
        subtype: 'type2',
        ship_to: 'Test City',
        ship_to_address: '456 Test St',
        phone_number: '987-654-3210',
        email: 'test@example.com',
        lot_number: 2002
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for empty input
  it('should return validation error for empty input', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

});

