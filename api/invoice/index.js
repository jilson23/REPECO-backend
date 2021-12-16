const { Router } = require('express');

const {
  createInvoiceHandler,
  deleteInvoiceHandler,
  getAllInvoicesHandler,
  getInvoiceByIdHandler,
  updateInvoiceHandler,
} = require('./invoice.controller');

const router = Router();

router.get('/', getAllInvoicesHandler);
router.post('/', createInvoiceHandler);
router.get('/:id', getInvoiceByIdHandler);
router.delete('/:id', updateInvoiceHandler);
router.patch('/:id', deleteInvoiceHandler);

module.exports = router;
