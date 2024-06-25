const WorkOrder = require('../models/workOrder');
const Schedule = require('../models/schedule');
const Shipping = require('../models/shipping');
const Cost = require('../models/cost');

exports.createWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.create(req.body);
    const schedule = await Schedule.create({ ...req.body.schedule, work_order_id: workOrder.id });
    const shipping = await Shipping.create({ ...req.body.shipping, work_order_id: workOrder.id });
    const cost = await Cost.create({ ...req.body.cost, work_order_id: workOrder.id });
    res.status(201).json({ workOrder, schedule, shipping, cost });
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
