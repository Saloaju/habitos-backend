const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    streak: {
        type: Number,
        default: 0
    },
    // Este arreglo guardará las fechas en las que se cumplió
    completedDates: {
        type: [Date],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);