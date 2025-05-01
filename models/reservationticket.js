const mongoose = require('mongoose');

const ReservationTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numberOfPlaces: {
      type: Number,
      required: true,
      min: [1, 'Le nombre de places doit être supérieur à 0'],
      max: [70, 'Le nombre de places ne peut pas dépasser 70'],
    },
    busId:{
      type:String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReservationTicket', ReservationTicketSchema);