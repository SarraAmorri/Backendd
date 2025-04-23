const mongoose = require('mongoose')

const Location = mongoose.model('Location ', {
    de: {
        type:String},

    a: {
        type:String
    },
    date: {
        type:Date}, 
    typeBus : {
        type:String
    }, 
    prix:{
        type:String},
    statut:{
        type:String},
    }
    )
    module.express =Location ;
   