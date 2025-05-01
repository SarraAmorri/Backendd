// backend/routes/urbain.js
const express = require('express');
const router = express.Router();
const Urbain = require('../models/urbain');
const { protect, isAdmin } = require('../middleware/auth');

router.post('/ajout', protect, isAdmin, async (req, res) => {
  try {
    const { NumLignes, Depart, Arrivee, Stationtraversee, Horaires, Prix, active } = req.body;

    if (!NumLignes || !Depart || !Arrivee || !Stationtraversee || !Horaires || !Prix) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    if (typeof Prix !== 'number' || Prix <= 0) {
      return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
    }

    const urbain = new Urbain({
      NumLignes,
      Depart,
      Arrivee,
      Stationtraversee,
      Horaires,
      Prix,
      active: active === true || active === 'oui',
    });
    const saved = await urbain.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de l\'ajout de la ligne.' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const urbain = await Urbain.find({});
    res.status(200).json(urbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération des lignes.' });
  }
});

router.get('/getbyid/:id', async (req, res) => {
  try {
    const urbain = await Urbain.findById(req.params.id);
    if (!urbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json(urbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la récupération de la ligne.' });
  }
});

router.delete('/supprimer/:id', protect, isAdmin, async (req, res) => {
  try {
    const urbain = await Urbain.findByIdAndDelete(req.params.id);
    if (!urbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json({ message: 'Ligne supprimée.', urbain });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la suppression de la ligne.' });
  }
});

router.put('/update/:id', protect, isAdmin, async (req, res) => {
  try {
    const { NumLignes, Depart, Arrivee, Stationtraversee, Horaires, Prix, active } = req.body;

    if (!NumLignes || !Depart || !Arrivee || !Stationtraversee || !Horaires || !Prix) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    if (typeof Prix !== 'number' || Prix <= 0) {
      return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
    }

    const urbain = await Urbain.findByIdAndUpdate(
      req.params.id,
      { NumLignes, Depart, Arrivee, Stationtraversee, Horaires, Prix, active: active === true || active === 'oui' },
      { new: true }
    );

    if (!urbain) {
      return res.status(404).json({ error: 'Ligne non trouvée.' });
    }
    res.status(200).json(urbain);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erreur lors de la modification de la ligne.' });
  }
});

module.exports = router;