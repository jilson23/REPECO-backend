const {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom
} = require('./room.service')

async function getAllRoomsHandler(req, res) {
  try {
    const rooms = await getAllRooms();
    console.log('rooms', rooms)
    return res.status(200).json(rooms)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getRoomByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const Room = await getRoomById(id);

    if (!Room) {
      return res.status(404).json({ message: `Room not found with id: ${id}` });
    }

    return res.status(200).json(Room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createRoomHandler(req, res) {
  try {
    const Room = await createRoom(req.body);
    return res.status(201).json(Room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateRoomHandler(req, res) {
  const { id } = req.params;
  try {
    const Room = await updateRoom(id, req.body);

    if (!Room) {
      return res.status(404).json({ message: `Room not found with id: ${id}` });
    }

    return res.status(200).json(Room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteRoomHandler(req, res) {
  const { id } = req.params;
  try {
    const Room = await deleteRoom(id);

    if (!Room) {
      return res.status(404).json({ message: `Room not found with id: ${id}` });
    }

    return res.status(200).json(Room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createRoomHandler,
  deleteRoomHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomHandler,
};
