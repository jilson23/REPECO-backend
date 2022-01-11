const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const {
  createReserveHandler,
  deleteReserveHandler,
  getAllReservesHandler,
  getReserveByIdHandler,
  updateReserveHandler,
} = require('./reserve.controller');

const router = Router();

router.get('/', getAllReservesHandler);
router.post('/', isAuthenticated(), createReserveHandler);
router.get('/:id', getReserveByIdHandler);
router.delete('/:id', updateReserveHandler);
router.patch('/:id', deleteReserveHandler);

module.exports = router;
