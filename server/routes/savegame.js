const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save game
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const saveData = req.body;
    
    await User.findByIdAndUpdate(userId, { saveGame: saveData });
    res.status(200).json({ message: 'Game saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Load game
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    res.status(200).json(user.saveGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;