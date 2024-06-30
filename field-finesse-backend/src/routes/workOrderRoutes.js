const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');

router.post('/', workOrderController.createWorkOrder);
router.get('/', workOrderController.getWorkOrders);
router.get('/:id', workOrderController.getWorkOrderById);
router.put('/:id', workOrderController.updateWorkOrder);
router.delete('/:id', workOrderController.deleteWorkOrder);

module.exports = router;
