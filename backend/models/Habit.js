const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
name: { type: String, required: true },
streak: { type: Number, default: 0 },
lastCompleted: { type: Date, default: null }
});

module.exports = mongoose.model('Habit', habitSchema);