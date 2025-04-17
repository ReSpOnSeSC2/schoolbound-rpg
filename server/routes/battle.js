const express = require('express');
const router = express.Router();
const Enemy = require('../models/Enemy');

// Process battle turn
router.post('/turn', async (req, res) => {
  try {
    const { enemyId, playerAction } = req.body;
    const enemy = await Enemy.findById(enemyId);
    
    // Simple AI logic (placeholder)
    let enemyAction = {
      type: 'attack',
      target: 0,  // Target first player character
      damage: enemy.stats.atk
    };
    
    res.status(200).json({ enemyAction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;