const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [
      {
        imageName: {
          type: String,
          require: true,
        },
        imageUrl: {
          type: String,
        }
      }
    ],
    services: [
      {
        serviceName: {
          type: String,
          require: true,
        },
        serviceUrl: {
          type: String,
        }
      }
    ],
    price: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Room', RoomSchema);
