const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
  subtotal: {
    type: Array,
    prices: [],
    required: true
  },
  totalPrice: {
    type: Number
  },

  reserve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserve'
  }

})

module.exports = mongoose.model('Invoice', InvoiceSchema)
