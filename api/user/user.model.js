const mongoose = require('mongoose');
const isEmail = require('validator').isEmail

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        validate: isEmail
    },
    password: {
        required: true,
        minlength: 8,
        maxlength: 30
    },
    name: {
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
    rol: {
        type:Number,
        required: true,
        default: 0
        /* 
        0=='client'
        1=='hotel administrator'
        2=='system administrator'
        */
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
    ]
})

module.exports = mongoose.model('User', UserSchema)
