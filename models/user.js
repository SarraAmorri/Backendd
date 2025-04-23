const mongoose = require('mongoose');

const User = mongoose.model('User', {
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: Number
    },
    numcin: {
        type: Number
    },
    adress: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = User;
