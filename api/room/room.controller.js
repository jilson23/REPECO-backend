const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  getRoomsByHotelId,
} = require('./room.service')

const { findOneHotel } = require('../hotel/hotel.services')

async function getAllRoomsHandler(req, res) {
  try {
    const rooms = await getAllRooms();
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

async function getRoomsbyHotelHandler(req, res) {
  const id = req.user._id;
  try {
    const hotel = await findOneHotel(id);
    if (!hotel) {
      return res.status(404).json({
        message: 'Hotel not found'
      });
    }
    const rooms = await getRoomsByHotelId(hotel._id)

    if (!rooms) {
      return res.status(404).json({
        message: 'Rooms not found'
      });
    }

    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function createRoomHandler(req, res) {
  const { files, body: { file }, user: { _id } } = req;

  const results = [];
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, { folder: 'rooms', filename_override: file.originalname });
      results.push({ imageName: result.original_filename, serviceUrl: result.public_id });
    } catch (error) {
      return res.status(500).json(error);
    } finally {
      fs.unlinkSync(file.path);
    }
  }

  try {
    const hotel = await findOneHotel(_id);

    const servicedata = JSON.parse(file[4]);

    if (!hotel) {
      return res.status(404).json({
        message: 'Hotel not found'
      });
    }

    const payload = {
      title: file[0],
      description: file[1],
      capacity: file[2],
      price: file[3],
      services: servicedata,
      images: results,
      hotel: hotel._id,
    }

    const Room = await createRoom(payload);
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
  getRoomsbyHotelHandler,
};
