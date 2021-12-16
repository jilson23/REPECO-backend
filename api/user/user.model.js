const mongoose = require('mongoose');
// const isEmail = require('validator').isEmail;
const config = require('../../config')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    // validate: isEmail
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 30
    },
    firstName: {
      type: String,
    },
    lastname: {
      type: String,

    },
    phone: {
      type: String,
    // validate: isMobilePhone('esPE')
    },
    document: {
      type: String,
      maxlength: 8,

    },
    role: {
      type: String,
      required: true,
      enum: config.userRoles,
      default: 'client',
    },
    active: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    },

    reserves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserve'
      }
    ]
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('User', UserSchema)
