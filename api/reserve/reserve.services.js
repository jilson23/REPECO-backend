const Reserve = require('./reserve.model');

/**
 * Get all reserves
 * @returns all reserves
 */ 

async function getAllReserves() {
    try {
      const reserves = await Reserve.find();
      return reserves;
    } catch (error) {
      throw error;
    }
}

/**
 * Get reserve by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns reserve
*/
async function getReserveById(id) {
  try {
    const reserve = await Reserve.findById(id);
    return reserve;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new reserve
 * @param {Object} reserve Reserve to create
 * @returns Reserve created
 */
 async function createReserve(reserve) {
  try {
    const newReserve = new Reserve(reserve);
    const savedReserve = await newReserve.save();
    return savedReserve;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a reserve
 * @param {string} id Indentifier of the reserve to be updated
 * @param {*} reserve Body of the reserve to be updated
 * @returns reserve updated
 */
 async function updateReserve(id, reserve) {
  try {
    const updatedReserve = await Reserve.findByIdAndUpdate(id, reserve);
    return updatedReserve;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a reserve
 * @param {String} id Identifier of the reserve to be deleted
 * @returns Reserve deleted
 */
async function deleteReserve(id) {
  try {
    const deletedReserve = await Reserve.findByIdAndDelete(id);
    return deletedReserve;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReserve,
  deleteReserve,
  getAllReserves,
  getReserveById,
  updateReserve,
};
