// backend/models/interurbain.js
const mongoose = require('mongoose');

const InterurbainSchema = new mongoose.Schema(
  {
    Depart: { type: String, required: true, trim: true },
    Arrivee: { type: String, required: true, trim: true },
    Horaires: { type: String, required: true, trim: true },
    Prix: { type: Number, required: true, min: [0, 'Le prix doit être positif.'] },
    active: { type: Boolean, default: true },
    placesDisponibles: {
      type: Number,
      required: true,
      default: 50,
      min: [0, 'Le nombre de places ne peut pas être négatif.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interurbain', InterurbainSchema);