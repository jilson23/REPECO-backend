const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../../config')

const CreditCardSchema = new mongoose.Schema(
  {
    expMonth: {
      type: String,
      required: true,
      trim: true,
    },
    expYear: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    docType: {
      type: String,
      required: true,
      trim: true,
    },
    docNumber: {
      type: String,
      required: true,
      trim: true,
    },
    mask: {
      type: String,
      required: true,
      trim: true,
    },
    tokenId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const BillingSchema = new mongoose.Schema(
  {
    creditCards: [CreditCardSchema],
    customerId: String,
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    // validate: isEmail
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    trim: true,
  },
  firstName: {
    type: String,
    default: 'User'
  },
  lastName: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    // validate: isMobilePhone('esPE')
  },
  avatar: {
    type: String,
    default: 'm2jxrpwok0hd4yqmpkc3'
  },
  cart: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
      },
      checkIn: {
        type: Date,
        required: true,
      },
      checkOut: {
        type: Date,
        required: true,
      }
    }
  ],
  role: {
    type: String,
    enum: config.userRoles,
    default: 'client',
  },
  active: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  billing: BillingSchema,
}, {
  timestamps: true,
},)

UserSchema.pre('save', async function (next) {
  const user = this;
  console.log(user)
  try {
    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    next(error);
  }
})

UserSchema.pre('findOneAndUpdate', async function() {
  const passUpdate = await this.model.findOne(this.getQuery())
  try {
    if (passUpdate.password !== this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(this._update.password, salt)
      this._update.password = newPassword
    }
  } catch (error) {
    console.log('errorSalt', error);
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return await bcrypt.compare(candidatePassword, user.password);
}

// virtuals

UserSchema.virtual('profile').get(function () {
  const {
    firstName,
    lastName,
    email,
    role,
    avatar,
  } = this;
  return {
    fullName: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
    email,
    role,
    avatar
  }
})

module.exports = mongoose.model('User', UserSchema)
