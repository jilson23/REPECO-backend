const { Router } = require('express');
const { createCardToken, createCustomer, createPayment } = require('./epayco');
const router = Router();

router.post('/token', createCardToken);
router.post('/customer', createCustomer);
router.post('/payment', createPayment);

module.exports = router;
