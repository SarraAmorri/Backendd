const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect'); // Adjust the path if needed

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes 
const userRoutes = require('./routes/user');
const resrevationticketRoutes = require('./routes/reservationticket');
app.use('/api/users', userRoutes);
app.use('/api/reservationticket', resrevationticketRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
