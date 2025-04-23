const express = require('express');

const router = express.Router();

const Urbain = require('../models/urbain');

//@admin
router.post('/ajout', (req, res) => {
    let data = req.body;
    let urbain = new Urbain(data);
    urbain.save()
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
    Urbain.find({})
     .then(
        (urbain )=>{
            res.status(200).send(urbain );
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
     Urbain.findOne({_id: id})
     .then(
        (urbain)=>{
            res.status(200).send(urbain);
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
   Urbain.findByIndDelete({_id: id})
     .then(
        (urbain)=>{
            res.status(200).send(urbain);
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

  Urbain.findByIndUpdate({ _id: id } , data )
  .then(
    (urbain)=>{
        res.status(200).send(urbain);
    }
  )
  .catch(
    (err) => {
        res.status(400).send(err);
    } 
)
 })

 module.exports = router;
