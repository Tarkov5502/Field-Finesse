const request = require('supertest');
const app = require('./field-finesse-backend/server'); // Adjust the path if your Express app is located elsewhere

describe('WorkOrder API', () => {

  // Setup and Teardown
  beforeAll(async () => {
    // Insert test data or set up required state before tests
    await request(app).post('/api/workorders').send({
      description: 'Initial work order',
      status: 'pending',
      schedule: { start_date: '2024-01-01', end_date: '2024-01-02' },
      shipping: { address: '123 Test St', city: 'Test City' },
      cost: { amount: 100, currency: 'USD' }
    });
  });

  afterAll(async () => {
    // Clean up test data or reset state after tests
    await request(app).delete('/api/workorders/1'); // Adjust the ID as needed
  });

  // Test for creating a new work order
  it('should create a new work order', async () => {
    const response = await request(app)
      .post('/api/workorders')
      .send({
        description: 'Test work order',
        status: 'pending',
        schedule: { start_date: '2024-01-01', end_date: '2024-01-02' },
        shipping: { address: '123 Test St', city: 'Test City' },
        cost: { amount: 100, currency: 'USD' }
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('workOrderId');
  });

  // Test for getting all work orders with pagination and sorting
  it('should get all work orders with pagination and sorting', async () => {
    const response = await request(app).get('/api/workorders?page=1&limit=10&sort=description&order=asc');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(10);
  });

  // Test for getting a work order by ID
  it('should get a work order by ID', async () => {
    const workOrderId = 1; // Replace with a valid work order ID in your database
    const response = await request(app).get(`/api/workorders/${workOrderId}`);
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Work order not found');
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', workOrderId);
    }
  });

  // Test for updating a work order
  it('should update a work order', async () => {
    const workOrderId = 1; // Replace with a valid work order ID in your database
    const response = await request(app)
      .put(`/api/workorders/${workOrderId}`)
      .send({
        description: 'Updated work order',
        status: 'completed',
        schedule: { start_date: '2024-01-01', end_date: '2024-01-02' },
        shipping: { address: '123 Updated St', city: 'Updated City' },
        cost: { amount: 150, currency: 'USD' }
      });
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Work order not found');
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('description', 'Updated work order');
    }
  });

  // Test for deleting a work order
  it('should delete a work order', async () => {
    const workOrderId = 1; // Replace with a valid work order ID in your database
    const response = await request(app).delete(`/api/workorders/${workOrderId}`);
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error', 'Work order not found');
    } else {
      expect(response.statusCode).toBe(204);
    }
  });

  // Additional tests for validation errors
  it('should return validation error for missing fields when creating a work order', async () => {
    const response = await request(app)
      .post('/api/workorders')
      .send({
        status: 'pending'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for invalid data types
  it('should return validation error for invalid data types', async () => {
    const response = await request(app)
      .post('/api/workorders')
      .send({
        description: 12345, // Invalid type
        status: 'pending',
        schedule: { start_date: '2024-01-01', end_date: '2024-01-02' },
        shipping: { address: '123 Test St', city: 'Test City' },
        cost: { amount: 'one hundred', currency: 'USD' } // Invalid type
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for excessively long input
  it('should return validation error for excessively long input', async () => {
    const longDescription = 'a'.repeat(1001); // Exceeds typical limit
    const response = await request(app)
      .post('/api/workorders')
      .send({
        description: longDescription,
        status: 'pending',
        schedule: { start_date: '2024-01-01', end_date: '2024-01-02' },
        shipping: { address: '123 Test St', city: 'Test City' },
        cost: { amount: 100, currency: 'USD' }
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Test for empty input
  it('should return validation error for empty input', async () => {
    const response = await request(app)
      .post('/api/workorders')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

});
