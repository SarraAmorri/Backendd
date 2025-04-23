const express = require('express');

const router = express.Router();

const Reservationticket = require('../models/reservationticket');


//@user
app.post('/ajout', (req, res) => {
    let data = req.body;
    let reservationticket = new Reservationticket(data);
    reservationticket .save()
        .then(
            (saved) => {
                res.status(200).send(saved);
            }
        )
        .catch(
            err => {
                res.status(400).send(err)
            }
        )
})
//@admin

app.get('/all', (req, res) => {
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

app.get('/getbyid/:id', (req, res) => {
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
app.delete('/supprimer/:id',(req,res)=>{
   
})
//@admin

app.put('/update/:id',(req,res)=>{
   
})
module.exports = router;



