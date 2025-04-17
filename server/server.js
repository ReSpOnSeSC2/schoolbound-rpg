const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// Add to server.js
const authRoutes = require('./routes/auth');
const saveGameRoutes = require('./routes/savegame');
const npcRoutes = require('./routes/npc');
const battleRoutes = require('./routes/battle');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/savegame', saveGameRoutes);
app.use('/npc', npcRoutes);
app.use('/battle', battleRoutes);


// Routes (to be added)
app.get('/', (req, res) => {
  res.send('Quirky Schoolbound RPG API is running');
});

// Add to server.js
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});