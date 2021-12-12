const Hotel = require('./hotel.model');

/**
 * Get all hotels
 * @returns all hotels
 */ 

async function getAllHotels() {
    try {
      const hotels = await Hotel.find();
      return hotels;
    } catch (error) {
      throw error;
    }
}

/**
 * Get hotel by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns hotel
*/
async function getHotelById(id) {
  try {
    const hotel = await Hotel.findById(id);
    return hotel;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new hotel
 * @param {Object} hotel Hotel to create
 * @returns Hotel created
 */
 async function createHotel(hotel) {
  try {
    const newHotel = new Hotel(hotel);
    const savedHotel = await newHotel.save();
    return savedHotel;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a hotel
 * @param {string} id Indentifier of the hotel to be updated
 * @param {*} hotel Body of the hotel to be updated
 * @returns hotel updated
 */
 async function updateHotel(id, hotel) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, hotel);
    return updatedHotel;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a hotel
 * @param {String} id Identifier of the hotel to be deleted
 * @returns Hotel deleted
 */
async function deleteHotel(id) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    return deletedHotel;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
};
