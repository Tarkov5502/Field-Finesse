import React, { useState, useEffect } from 'react';
import { getWorkOrders } from '../api/api';
import PendingWorkOrders from '../components/PendingWorkOrders';

const WorkOrdersPage = () => {
  const [pendingWorkOrders, setPendingWorkOrders] = useState([]);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await getWorkOrders('pending');
        setPendingWorkOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div>
      <PendingWorkOrders workOrders={pendingWorkOrders} />
    </div>
  );
};

export default WorkOrdersPage;
