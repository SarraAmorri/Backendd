const express = require('express');
const jwt = require('jsonwebtoken');


const router = express.Router();

const Reservationticket = require('../models/reservationticket');


//@user
router.post('/ajout', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header
    if (!token) return res.status(403).send({ error: 'Token manquant' });

    jwt.verify(token, 'ton_secret_key', (err, decoded) => {
        if (err) return res.status(403).send({ error: 'Token invalide' });

        const userId = decoded.id; // Get userId from the decoded token
        const { numberOfPlaces, busId } = req.body;

        let reservationticket = new Reservationticket({ userId, numberOfPlaces, busId });
        reservationticket.save()
            .then((saved) => {
                res.status(200).send(saved);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });
});
//@admin

router.get('/all', (req, res) => {
    Reservationticket.find({})
     .then(
        (reservationticket)=>{
            res.status(200).send(reservationticket);
        }
     )
     .catch(
        err => {
            res.status(400).send(err)
        } 
     )
    })
// @admin

router.get('/getbyid/:id', (req, res) => {
     let id = req.params.id
     Reservationticket.findOne({_id: id})
     .then(
        (reservationticket)=>{
            res.status(200).send(reservationticket);
        }
     )
     .catch(
        err => {
            res.status(400).send(err)
        } 
     )
})

//@admin
router.delete('/supprimer/:id',(req,res)=>{
   
})
//@admin

router.put('/update/:id',(req,res)=>{
   
})
module.exports = router;