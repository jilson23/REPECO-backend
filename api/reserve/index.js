const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');

const {
  createReserveHandler,
  deleteReserveHandler,
  getAllReservesHandler,
  getReserveByIdHandler,
  updateReserveHandler,
  getUsersReserves,
  getReservesCountByHotelHandler,
} = require('./reserve.controller');

const router = Router();

router.get('/', getAllReservesHandler);
router.get('/user/reserves', isAuthenticated(), getUsersReserves)
router.get('/hotel/', hasRole(['hotel']), getReservesCountByHotelHandler);
router.post('/', isAuthenticated(), createReserveHandler);
router.get('/user/reserves', isAuthenticated(), getUsersReserves)
router.get('/:id', getReserveByIdHandler);
// router.get('/:id', getReserveByIdHandler);
router.delete('/:id', updateReserveHandler);
router.patch('/:id', deleteReserveHandler);

module.exports = router;
