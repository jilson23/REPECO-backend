const { Router } = require('express');

const {
  createRoomHandler,
  deleteRoomHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomHandler,
} = require('./room.controller');

const { hasRole } = require('../../auth/auth.service');

const router = Router();

router.get('/', getAllRoomsHandler);
router.get('/:id', getRoomByIdHandler);
router.post('/', hasRole(['hotel', 'admin']), createRoomHandler);
router.patch('/:id', deleteRoomHandler);
router.delete('/:id', updateRoomHandler);

module.exports = router;
