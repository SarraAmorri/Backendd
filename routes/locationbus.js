const express = require('express');

const router = express.Router();

const Location = require('../models/locationbus');


//@user
app.post('/ajout', (req, res) => {
    let data = req.body;
    let locationbus = new Location(data);
    locationbus.save()
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
    Location.find({})
     .then(
        (locations)=>{
            res.status(200).send(locations);
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
     Location.findOne({_id: id})
     .then(
        (location)=>{
            res.status(200).send(location);
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
    Location.findByIdandDelete({_id: id})
      .then(
         (locations)=>{
             res.status(200).send(locations);
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
 
    Location.findByIndUpdate({ _id: id } , data )
   .then(
     (locations)=>{
         res.status(200).send(locations);
     }
   )
   .catch(
     (err) => {
         res.status(400).send(err);
     } 
 )
  })
  module.exports = router;




