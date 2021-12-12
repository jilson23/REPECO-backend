const { Router } = require('express');

const {
  createHotelHandler,
  deleteHotelHandler,
  getAllHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
} = require('./hotel.controller');

const router = Router();

router.get('/', getAllHotelsHandler);
router.post('/', createHotelHandler);
router.get('/:id', getHotelByIdHandler);
router.delete('/:id', updateHotelHandler);
router.patch('/:id', deleteHotelHandler);

module.exports = router;