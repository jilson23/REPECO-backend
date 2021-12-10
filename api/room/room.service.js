const Room = require('./room.model');

/**
 * Get all rooms
 * @returns all rooms
 */ 

async function getAllRooms() {
    try {
      const rooms = await Room.find();
      return rooms;
    } catch (error) {
      throw error;
    }
}

/**
 * Get room by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns room
*/
async function getRoomById(id) {
  try {
    const room = await Room.findById(id);
    return room;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new room
 * @param {Object} room Room to create
 * @returns Room created
 */
 async function createRoom(room) {
  try {
    const newRoom = new Room(room);
    const savedRoom = await newRoom.save();
    return savedRoom;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a room
 * @param {string} id Indentifier of the room to be updated
 * @param {*} room Body of the room to be updated
 * @returns room updated
 */
 async function updateRoom(id, room) {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, room);
    return updatedRoom;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a room
 * @param {String} id Identifier of the room to be deleted
 * @returns Room deleted
 */
async function deleteRoom(id) {
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    return deletedRoom;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
};
