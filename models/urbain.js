// backend/models/urbain.js
const mongoose = require('mongoose');

const UrbainSchema = new mongoose.Schema(
  {
    NumLignes: { type: String, required: true, trim: true },
    Depart: { type: String, required: true, trim: true },
    Arrivee: { type: String, required: true, trim: true },
    Stationtraversee: { type: String, required: true, trim: true },
    Horaires: { type: String, required: true, trim: true },
    Prix: { type: Number, required: true, min: [0, 'Le prix doit être positif.'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Urbain', UrbainSchema);