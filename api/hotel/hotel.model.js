const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        enum: ['Hotel', 'Hospedaje', 'Hostal', 'Posada', 'Otro']
    },
    address: {
        type: String,
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
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        }
    ]
})


module.exports = mongoose.model('Hotel', HotelSchema)