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
  makePaymentHandlers,
  getInvoiceUserById
} = require('./invoice.controller');

const router = Router();

router.get('/', getAllInvoicesHandler);
router.get('/user/:id', isAuthenticated(), getInvoiceUserById);
router.post('/', isAuthenticated(), createInvoiceHandler);
router.delete('/:id', updateInvoiceHandler);
router.patch('/:id', deleteInvoiceHandler);
router.post('/card-token', isAuthenticated(), createCardTokenHandlers);
router.post('/customer', isAuthenticated(), createCustomerHandlers);
router.post('/payment', isAuthenticated(), makePaymentHandlers);
router.get('/:id', getInvoiceByIdHandler);

module.exports = router;
