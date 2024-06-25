import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import WorkOrderForm from '../components/WorkOrderForm';

const CallCenterPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerCreated = (newCustomer) => {
    setSelectedCustomer(newCustomer);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div>
      <CustomerForm onCustomerCreated={handleCustomerCreated} />
      <CustomerList onSelect={handleCustomerSelect} />
      {selectedCustomer && <WorkOrderForm customer={selectedCustomer} />}
    </div>
  );
};

export default CallCenterPage;
