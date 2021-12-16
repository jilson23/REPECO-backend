const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
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
    services: {
        type: Array,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    capacity:{
        type: Number,
        required: true,
        min:1
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
    ],
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    },
    timestamps: true
    
});

module.exports = mongoose.model('Room', RoomSchema);