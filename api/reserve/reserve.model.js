const mongoose = require('mongoose')

const ReserveSchema = new mongoose.Schema({
    //one to many (user-reserve)
    //dia de entrada y salida
    //965428603

    adminissionDate: {
        //dia de entrada
        type: Date,
        required: true
    },
    depurateDate: {
    //día de salida   
        type: Date,
        required: true
    },

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Reserve', ReserveSchema)