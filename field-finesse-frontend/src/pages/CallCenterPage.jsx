import React, { useState } from 'react';
import CustomerSearchForm from '../components/CustomerSearchForm';
import CustomerList from '../components/CustomerList';
import CreateCustomerForm from '../components/CreateCustomerForm';
import WorkOrderForm from '../components/WorkOrderForm';
import { getCustomers } from '../api/api';

const CallCenterPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await getCustomers(query);
      setCustomers(response.data);
      if (response.data.length === 0) {
        setShowCreateCustomerForm(true);
      } else {
        setShowCreateCustomerForm(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setShowWorkOrderForm(false);
  };

  const handleCreateCustomer = () => {
    setShowCreateCustomerForm(true);
  };

  const handleCustomerCreated = (newCustomer) => {
    setSelectedCustomer(newCustomer);
    setShowCreateCustomerForm(false);
    setShowWorkOrderForm(false);
  };

  const handleWorkOrderCreated = () => {
    setSelectedCustomer(null);
    setShowWorkOrderForm(false);
    setSearchQuery('');
    setCustomers([]);
  };

  return (
    <div>
      {!showWorkOrderForm && !showCreateCustomerForm && (
        <>
          <CustomerSearchForm onSearch={handleSearch} />
          <CustomerList 
            customers={customers} 
            onSelect={handleCustomerSelect} 
            searchQuery={searchQuery} 
          />
        </>
      )}
      {selectedCustomer && !showWorkOrderForm && (
        <button onClick={() => setShowWorkOrderForm(true)}>Create Work Order</button>
      )}
      {showCreateCustomerForm && !showWorkOrderForm && (
        <CreateCustomerForm 
          initialData={{ name: searchQuery }} 
          onCustomerCreated={handleCustomerCreated} 
        />
      )}
      {showWorkOrderForm && (
        <WorkOrderForm 
          customer={selectedCustomer} 
          onWorkOrderCreated={handleWorkOrderCreated} 
        />
      )}
    </div>
  );
};

export default CallCenterPage;
