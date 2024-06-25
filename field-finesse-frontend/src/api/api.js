import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your_vm_ip_address:3000', // Replace with your backend URL
});

// Customers API
export const getCustomers = () => api.get('/customers');
export const createCustomer = (customer) => api.post('/customers', customer);

// Work Orders API
export const getWorkOrders = (status) => api.get(`/work-orders?status=${status}`);
export const createWorkOrder = (workOrder) => api.post('/work-orders', workOrder);

export default api;
