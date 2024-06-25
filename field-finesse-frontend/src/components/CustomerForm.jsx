import React, { useState } from 'react';
import { createCustomer } from '../api/api';

const CustomerForm = ({ onCustomerCreated }) => {
  const [customer, setCustomer] = useState({
    name: '',
    client_type: '',
    subtype: '',
    ship_to: '',
    ship_to_address: '',
    phone_number: '',
    email: '',
    lot_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCustomer(customer);
      onCustomerCreated(response.data);
      setCustomer({
        name: '',
        client_type: '',
        subtype: '',
        ship_to: '',
        ship_to_address: '',
        phone_number: '',
        email: '',
        lot_number: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={customer.name} onChange={handleChange} placeholder="Name" required />
      <input name="client_type" value={customer.client_type} onChange={handleChange} placeholder="Client Type" required />
      <input name="subtype" value={customer.subtype} onChange={handleChange} placeholder="Subtype" required />
      <input name="ship_to" value={customer.ship_to} onChange={handleChange} placeholder="Ship To" required />
      <input name="ship_to_address" value={customer.ship_to_address} onChange={handleChange} placeholder="Ship To Address" required />
      <input name="phone_number" value={customer.phone_number} onChange={handleChange} placeholder="Phone Number" required />
      <input name="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
      <input name="lot_number" value={customer.lot_number} onChange={handleChange} placeholder="Lot Number" required />
      <button type="submit">Create Customer</button>
    </form>
  );
};

export default CustomerForm;
