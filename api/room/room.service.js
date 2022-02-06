const Room = require('./room.model');

/**
 * Get all rooms
 * @returns all rooms
 */

async function getAllRooms() {
  const rooms = await Room.find().populate('hotel');
  return rooms;
}

/**
 * Get room by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns room
*/
async function getRoomById(id) {
  const room = await Room.findById(id).populate('hotel');
  return room;
}

/**
 * Get room by hotel id
 * @param {string} id Indentifier of the note to be filtered
 * @returns room
*/
async function getRoomsByHotelId(ids) {
  const room = await Room.find({ hotel: ids });
  return room;
}

/**
 * Create a new room
 * @param {Object} room Room to create
 * @returns Room created
 */
async function createRoom(room) {
  const newRoom = new Room(room);
  const savedRoom = await newRoom.save();
  return savedRoom;
}

/**
 * Update a room
 * @param {string} id Indentifier of the room to be updated
 * @param {*} room Body of the room to be updated
 * @returns room updated
 */
async function updateRoom(id, room) {
  const updatedRoom = await Room.findByIdAndUpdate(id, room);
  return updatedRoom;
}

/**
 * Delete a room
 * @param {String} id Identifier of the room to be deleted
 * @returns Room deleted
 */
async function deleteRoom(id) {
  const deletedRoom = await Room.findByIdAndDelete(id);
  return deletedRoom;
}

module.exports = {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  getRoomsByHotelId,
};
