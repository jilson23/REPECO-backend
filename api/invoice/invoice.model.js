const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

module.exports = mongoose.model('Invoice', InvoiceSchema)