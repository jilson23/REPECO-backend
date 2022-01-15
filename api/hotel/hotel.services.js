const Hotel = require('./hotel.model');

/**
 * Get all hotels
 * @returns all hotels
 */

async function getAllHotels() {
  const hotels = await Hotel.find().populate({ path: 'user' });
  return hotels;
}

/**
 * Get hotel by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns hotel
*/
async function getHotelById(id) {
  const hotel = await Hotel.findById(id);
  return hotel;
}

/**
 * Create a new hotel
 * @param {Object} hotel Hotel to create
 * @returns Hotel created
 */
async function createHotel(hotel) {
  const newHotel = new Hotel(hotel);
  const savedHotel = await newHotel.save();
  return savedHotel;
}

/**
 * Update a hotel
 * @param {string} id Indentifier of the hotel to be updated
 * @param {*} hotel Body of the hotel to be updated
 * @returns hotel updated
 */
async function updateHotel(id, hotel) {
  const updatedHotel = await Hotel.findByIdAndUpdate(id, hotel);
  return updatedHotel;
}

/**
 * Delete a hotel
 * @param {String} id Identifier of the hotel to be deleted
 * @returns Hotel deleted
 */
async function deleteHotel(id) {
  const deletedHotel = await Hotel.findByIdAndDelete(id);
  return deletedHotel;
}

module.exports = {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
};
