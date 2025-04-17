const mongoose = require('mongoose');

const EnemySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Grunt', 'Tank', 'Sniper', 'Swarm', 'Leader'],
    required: true
  },
  stats: {
    hp: { type: Number, required: true },
    atk: { type: Number, required: true },
    def: { type: Number, required: true },
    spd: { type: Number, required: true },
    res: { type: Number, required: true }
  },
  abilities: [String],
  aiPattern: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Enemy', EnemySchema);