const express = require('express');

const router = express.Router();

const Interurbainser = require('../models/interurbainse');

//@admin
router.post('/ajout', (req, res) => {
    let data = req.body;
    let interurbain = new Interurbain(data);
    interurbain.save()
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

//@admin //@user
router.get('/all', (req, res) => {
    Interurbain.find({})
     .then(
        (interurbain)=>{
            res.status(200).send(interurbain);
        }
     )
     .catch(
        err => {
            res.status(400).send(err)
        } 
     )
})

//@user @admin
router.get('/getbyid/:id', (req, res) => {
     let id = req.params.id
     Interurbain.findOne({_id: id})
     .then(
        (interurbain)=>{
            res.status(200).send(interurbain);
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
   let id = req.params.id
   Interurbain.findByIndDelete({_id: id})
     .then(
        (interurbain)=>{
            res.status(200).send(interurbain);
        }
     )
     .catch(
        (err) => {
            res.status(400).send(err);
        } 
    )
})

//@admin
router.put('/update/:id',(req,res)=>{
   let id = req.params.id
   let sata = req.body;
   datatags = data.tags.split(',');

  Interurbain.findByIndUpdate({ _id: id } , data )
  .then(
    (interurbain)=>{
        res.status(200).send(interurbain);
    }
  )
  .catch(
    (err) => {
        res.status(400).send(err);
    } 
)
 })

 module.exports = router;