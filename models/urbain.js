const mongoose = require('mongoose')

const Urbain = mongoose.model('Urbain ', {
    numero:{
        type:String
    },
    depart: {
        type:String},

    arrivee: {
        type:String
    },
    stationstraversee: {
        type:String
    },
    horaires: {
        type:Time}, 
    prix : {
        type:Float
    },
    active: {
        type:String
    }  ,    
    })
    module.express = Urbain ;