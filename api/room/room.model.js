const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    id: {
      type: Number,
      required: true  
    },
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
    address: {
        type: Object,
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
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);