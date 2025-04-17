const express = require('express');
const router = express.Router();
const NPC = require('../models/NPC');

// Get dynamic dialogue
router.post('/dialogue', async (req, res) => {
  try {
    const { npcId, context } = req.body;
    const npc = await NPC.findById(npcId);
    
    // This is a placeholder for the ChatGPT API call
    // You'll implement this in week 10
    const dialogue = `Hello there! I'm ${npc.name} from the ${npc.area}.`;
    
    res.status(200).json({ dialogue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;