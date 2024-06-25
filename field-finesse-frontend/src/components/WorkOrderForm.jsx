import React, { useState } from 'react';
import { createWorkOrder } from '../api/api';

const WorkOrderForm = ({ customer }) => {
  const [workOrder, setWorkOrder] = useState({
    so_number: '',
    customer_id: customer.id,
    customer_name: customer.name,
    customer_po: '',
    garaganet_number: '',
    job_name: '',
    entered_by: '',
    salesman_name: '',
    door: '',
    total_sq_ft: '',
    hardware: '',
    operator: '',
    order_date: '',
    order_type: '',
    invoice_type: '',
    accountable: '',
    note: '',
    status: 'pending',
    followup_status: 'pending',
    total: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkOrder({ ...workOrder, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWorkOrder(workOrder);
      setWorkOrder({
        so_number: '',
        customer_id: customer.id,
        customer_name: customer.name,
        customer_po: '',
        garaganet_number: '',
        job_name: '',
        entered_by: '',
        salesman_name: '',
        door: '',
        total_sq_ft: '',
        hardware: '',
        operator: '',
        order_date: '',
        order_type: '',
        invoice_type: '',
        accountable: '',
        note: '',
        status: 'pending',
        followup_status: 'pending',
        total: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="so_number" value={workOrder.so_number} onChange={handleChange} placeholder="S.O. #" required />
      <input name="customer_po" value={workOrder.customer_po} onChange={handleChange} placeholder="Customer P.O." required />
      <input name="garaganet_number" value={workOrder.garaganet_number} onChange={handleChange} placeholder="GaragaNet #" required />
      <input name="job_name" value={workOrder.job_name} onChange={handleChange} placeholder="Job Name" required />
      <input name="entered_by" value={workOrder.entered_by} onChange={handleChange} placeholder="Entered By" required />
      <input name="salesman_name" value={workOrder.salesman_name} onChange={handleChange} placeholder="Salesman Name" required />
      <input name="door" value={workOrder.door} onChange={handleChange} placeholder="Door" required />
      <input name="total_sq_ft" value={workOrder.total_sq_ft} onChange={handleChange} placeholder="Total Sq. Ft." required />
      <input name="hardware" value={workOrder.hardware} onChange={handleChange} placeholder="Hardware" required />
      <input name="operator" value={workOrder.operator} onChange={handleChange} placeholder="Operator" required />
      <input name="order_date" type="date" value={workOrder.order_date} onChange={handleChange} placeholder="Order Date" required />
      <input name="order_type" value={workOrder.order_type} onChange={handleChange} placeholder="Order Type" required />
      <input name="invoice_type" value={workOrder.invoice_type} onChange={handleChange} placeholder="Invoice Type" required />
      <input name="accountable" value={workOrder.accountable} onChange={handleChange} placeholder="Accountable" required />
      <input name="note" value={workOrder.note} onChange={handleChange} placeholder="Note" />
      <input name="status" value={workOrder.status} onChange={handleChange} placeholder="Status" required />
      <input name="followup_status" value={workOrder.followup_status} onChange={handleChange} placeholder="Followup Status" required />
      <input name="total" value={workOrder.total} onChange={handleChange} placeholder="Total" required />
      <button type="submit">Create Work Order</button>
    </form>
  );
};

export default WorkOrderForm;
