const Reserve = require('./reserve.model');

/**
 * Get reserves by user
 * @returns reserves by user
 */

async function getReservesByUser(idUser) {
  const reserves = await Reserve.find({ user: idUser }).populate({ path: 'room', populate: { path: 'hotel' } });
  return reserves;
}

/**
 * Get all reserves
 * @returns all reserves
 */

async function getAllReserves() {
  const reserves = await Reserve.find().populate('room');
  return reserves;
}

/**
 * Get all reserves by hotel
 * @returns all reserves
 */

async function getAllReservesByHotel(query) {
  const reserves = await Reserve.find(query).populate('room');
  return reserves;
}

/**
 * Get reserve by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns reserve
*/
async function getReserveById(id) {
  const reserve = await Reserve.findById(id);
  return reserve;
}

// async function getReserveByUser(user) {
//   const reserves = await Reserve.find({ user });
//   return reserves;
// }

/**
 * Create a new reserve
 * @param {Object} reserve Reserve to create
 * @returns Reserve created
 */
async function createReserve(reserve) {
  const newReserve = new Reserve(reserve);
  const savedReserve = await newReserve.save();
  return savedReserve;
}

/**
 * Update a reserve
 * @param {string} id Indentifier of the reserve to be updated
 * @param {*} reserve Body of the reserve to be updated
 * @returns reserve updated
 */
async function updateReserve(id, reserve) {
  const updatedReserve = await Reserve.findByIdAndUpdate(id, reserve);
  return updatedReserve;
}

/**
 * Delete a reserve
 * @param {String} id Identifier of the reserve to be deleted
 * @returns Reserve deleted
 */
async function deleteReserve(id) {
  const deletedReserve = await Reserve.findByIdAndDelete(id);
  return deletedReserve;
}

module.exports = {
  createReserve,
  deleteReserve,
  getAllReserves,
  getReserveById,
  updateReserve,
  getReservesByUser,
  getAllReservesByHotel,
};
