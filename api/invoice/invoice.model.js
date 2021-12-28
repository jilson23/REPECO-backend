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
  invoiceNumber: {
    type: Number,
    required: true
  },
  reserves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reserve',
      required: true
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },

})

module.exports = mongoose.model('Invoice', InvoiceSchema)
