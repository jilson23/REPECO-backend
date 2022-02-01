const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
  refId: {
    type: String,
    required: true,
    trim: true,
  },
  bill: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    uppercase: true,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    default: 0,
  },
  taxBase: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    trim: true,
    uppercase: true,
  },
  invoiceNumber: {
    type: Number,
    required: true
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },

}, {
  timestamps: true,
},)

module.exports = mongoose.model('Invoice', InvoiceSchema)
