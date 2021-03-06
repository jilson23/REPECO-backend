const mongoose = require('mongoose')
const config = require('../../config')

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: config.hotelCategory,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    region: {
      type: String
    },
    country: {
      type: String
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }
})

module.exports = mongoose.model('Hotel', HotelSchema)
