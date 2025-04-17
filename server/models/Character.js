const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  archetype: {
    type: String,
    required: true
  },
  stats: {
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    con: { type: Number, required: true },
    int: { type: Number, required: true },
    chr: { type: Number, required: true }
  },
  abilities: [String],
  weaknesses: [String]
});

module.exports = mongoose.model('Character', CharacterSchema);