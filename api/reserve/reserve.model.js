const mongoose = require('mongoose')

const ReserveSchema = new mongoose.Schema({
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  isProcesing: {
    type: Boolean,
    default: false,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }
})

module.exports = mongoose.model('Reserve', ReserveSchema)
