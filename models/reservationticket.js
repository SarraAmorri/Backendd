const mongoose = require('mongoose')

const Reservationticket = mongoose.model('Reservationticket ', {
    busid: {
        type: String
    },

    userid: {
        type: String
    },
    nbrtik: {
        type: Number,
    }
})

module.express = Reservationticket;
