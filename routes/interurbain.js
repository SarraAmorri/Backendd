// backend/routes/interurbain.js
const express = require('express');
const router = express.Router();
const Interurbain = require('../models/interurbain');
const { protect, isAdmin } = require('../middleware/auth');

router.post('/ajout', protect, isAdmin, async (req, res) => {
  try {
    const { Depart, Arrivee, Horaires, Prix, active } = req.body;

    if (!Depart || !Arrivee || !Horaires || !Prix) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    if (typeof Prix !== 'number' || Prix <= 0) {
      return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
    }

    const interurbain = new Interurbain({
      Depart,
      Arrivee,
      Horaires,
      Prix,
      active: active === true || active === 'oui',
    });
    const saved = await interurbain.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de l\'ajout de la ligne.' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const interurbain = await Interurbain.find({});
    res.status(200).json(interurbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération des lignes.' });
  }
});

router.get('/getbyid/:id', async (req, res) => {
  try {
    const interurbain = await Interurbain.findById(req.params.id);
    if (!interurbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json(interurbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération de la ligne.' });
  }
});

router.delete('/supprimer/:id', protect, isAdmin, async (req, res) => {
  try {
    const interurbain = await Interurbain.findByIdAndDelete(req.params.id);
    if (!interurbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json({ message: 'Ligne supprimée.', interurbain });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la suppression de la ligne.' });
  }
});

router.put('/update/:id', protect, isAdmin, async (req, res) => {
  try {
    const { Depart, Arrivee, Horaires, Prix, active } = req.body;

    if (!Depart || !Arrivee || !Horaires || !Prix) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    if (typeof Prix !== 'number' || Prix <= 0) {
      return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
    }

    const interurbain = await Interurbain.findByIdAndUpdate(
      req.params.id,
      { Depart, Arrivee, Horaires, Prix, active: active === true || active === 'oui' },
      { new: true }
    );

    if (!interurbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json(interurbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la modification de la ligne.' });
  }
});

module.exports = router;