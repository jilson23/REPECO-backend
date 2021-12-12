const { Router } = require('express');

const {
  createRoomHandler,
  deleteRoomHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomHandler,
} = require('./room.controller');

const router = Router();

router.get('/', getAllRoomsHandler);
router.post('/', createRoomHandler);
router.get('/:id', getRoomByIdHandler);
router.delete('/:id', updateRoomHandler);
router.patch('/:id', deleteRoomHandler);

module.exports = router;