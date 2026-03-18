const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null },
  // NUEVO: Esto enlaza el hábito con el usuario que lo creó
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

module.exports = mongoose.model('Habit', habitSchema);