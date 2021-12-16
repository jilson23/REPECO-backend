const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  tags: {
    type: Array,
    required: false
  },
  price: {
    type: Number,
    required: true
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },

  reserves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reserve'
    }
  ]

}, {
  timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);
