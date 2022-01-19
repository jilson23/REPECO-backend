const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const {
  createInvoiceHandler,
  deleteInvoiceHandler,
  getAllInvoicesHandler,
  getInvoiceByIdHandler,
  updateInvoiceHandler,
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers
} = require('./invoice.controller');

const router = Router();

router.get('/', getAllInvoicesHandler);
router.post('/', isAuthenticated(), createInvoiceHandler);
router.get('/:id', getInvoiceByIdHandler);
router.delete('/:id', updateInvoiceHandler);
router.patch('/:id', deleteInvoiceHandler);
router.post('/card-token', isAuthenticated(), createCardTokenHandlers);
router.post('/customer', isAuthenticated(), createCustomerHandlers);
router.post('/payment', isAuthenticated(), makePaymentHandlers);

module.exports = router;
