const WorkOrder = require('../models/workOrder');

exports.createWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.create(req.body);
    res.status(201).json(workOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkOrders = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    const workOrders = await WorkOrder.findAll({ where: { status } });
    res.status(200).json(workOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
