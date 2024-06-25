import React, { useEffect, useState } from 'react';
import { getCustomers } from '../api/api';

const CustomerList = ({ onSelect }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Select a Customer</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} onClick={() => onSelect(customer)}>
            {customer.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
