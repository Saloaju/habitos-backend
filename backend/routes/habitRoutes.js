const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// ALTA: Crear un nuevo hábito
router.post('/', async (req, res) => {
    try {
        const newHabit = new Habit(req.body);
        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Obtener todos los hábitos (útil para ver qué hay)
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CAMBIOS: Actualizar un hábito por su ID
router.put('/:id', async (req, res) => {
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Para que devuelva el objeto ya actualizado
        );
        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// BAJAS: Eliminar un hábito por su ID
router.delete('/:id', async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Hábito eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;