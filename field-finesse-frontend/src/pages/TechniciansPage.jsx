import React, { useState, useEffect } from 'react';
import { getWorkOrders } from '../api/api';
import TechnicianWorkOrders from '../components/TechnicianWorkOrders';

const TechniciansPage = () => {
  const [assignedWorkOrders, setAssignedWorkOrders] = useState([]);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await getWorkOrders('assigned');
        setAssignedWorkOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div>
      <TechnicianWorkOrders workOrders={assignedWorkOrders} />
    </div>
  );
};

export default TechniciansPage;
