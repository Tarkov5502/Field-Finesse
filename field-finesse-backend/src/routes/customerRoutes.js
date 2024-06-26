const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); // Correct path

router.post('/', customerController.createCustomer);
router.get('/', customerController.getCustomers);

module.exports = router;
