const mongoose = require('mongoose');

const NPCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  dialogueSeed: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('NPC', NPCSchema);