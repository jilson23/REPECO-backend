const { Router } = require('express');
const multer = require('multer');

const {
  createRoomHandler,
  deleteRoomHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomHandler,
  getRoomsbyHotelHandler,
} = require('./room.controller');
const { hasRole } = require('../../auth/auth.service')

const router = Router();

const upload = multer({ dest: './temp', limits: { fieldSize: '50MB' } });

router.get('/', getAllRoomsHandler);
router.get('/hotel', hasRole(['hotel']), getRoomsbyHotelHandler);
router.get('/:id', getRoomByIdHandler);
router.post('/', upload.any(), hasRole(['hotel']), createRoomHandler);
router.patch('/:id', upload.any(), hasRole(['hotel']), updateRoomHandler);
router.delete('/', deleteRoomHandler);

module.exports = router;
