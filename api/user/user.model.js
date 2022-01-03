const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../../config')

const UserSchema = new mongoose.Schema(
  {
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
      maxlength: 30,
      trim: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
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
  },
  {
    timestamps: true,
  },
)

UserSchema.pre('save', async function (next) {
  const user = this;
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

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;

  return await bcrypt.compare(candidatePassword, user.password);
}

// virtuals

UserSchema.virtual('profile').get(function () {
  const { firstName, lastName, email, role } = this;
  return { fullName: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`, email, role }
})

module.exports = mongoose.model('User', UserSchema)
