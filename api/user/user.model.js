const mongoose = require('mongoose');
const isEmail = require('validator').isEmail

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: isEmail
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
        type:String,
        validate: isMobilePhone('esPE')
    },
    document: {
        type:String,
        maxlength: 8,
    
    },
    role: {
        enum:['client', 'hotel', 'administrator'],
        required: true,
        default: 'client'
    },
    cart: {
        type: Array
    },
    //en duda
    isActive: {
        type: Boolean,
        default: true
    },

    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },   
    
    reserves: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Reserve'
        }
    ],
    invoice: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Invoice'
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)
