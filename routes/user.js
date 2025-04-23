const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// @user - Ajouter un utilisateur
router.post('/register', (req, res) => {
    let data = req.body;
    let user = new User(data);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(data.password, salt);

    user.save()
        .then(saved => {
            res.status(200).send(saved);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// @user 
router.post('/login', (req, res) => {
    let data = req.body;

    User.findOne({ email: data.email })
        .then(
             (user)=> {
            let valid = bcrypt.compareSync(data.password, user.password);
            if (!valid) {
               res.send('Email ou mot de passe invalide');
            }else{
                let payload ={
                    _id : user._id,
                    email: user.email,
                    fullname: user.name + '' + user.lastname
                }
                let token = jwt.sign(payload,'1234');
                res.send({mytoken: token})
            }
        }
    )
        .catch(
            err => {
            res.status(400).send(err);
            }
        )
        });

// @admin - Afficher tous les utilisateurs
router.get('/all', (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// @admin @user - Récupérer un utilisateur par ID
router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id;

    User.findOne({ _id: id })
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// @admin - Supprimer un utilisateur
router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete({ _id: id })
        .then(deleted => {
            res.status(200).send(deleted);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// @admin @user - Modifier un utilisateur
router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;

    User.findByIdAndUpdate({ _id: id }, data, { new: true })
        .then(updated => {
            res.status(200).send(updated);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
