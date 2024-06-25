const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');

router.post('/', workOrderController.createWorkOrder);
router.get('/', workOrderController.getWorkOrders);

module.exports = router;
