const mongoose = require('mongoose')

const Interurbain = mongoose.model('Interurbain ', {
    depart: {
        type:String},

    arrivee: {
        type:String
    },
    horaires: {
        type:Time}, 
    prix : {
        type:Float
    }, 
    })
    module.express = Interurbain ;