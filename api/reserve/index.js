const { Router } = require('express');

const {
  createReserveHandler,
  deleteReserveHandler,
  getAllReservesHandler,
  getReserveByIdHandler,
  updateReserveHandler,
} = require('./hotel.controller');

const router = Router();

router.get('/', getAllReservesHandler);
router.post('/', createReserveHandler);
router.get('/:id', getReserveByIdHandler);
router.delete('/:id', updateReserveHandler);
router.patch('/:id', deleteReserveHandler);

module.exports = router;
