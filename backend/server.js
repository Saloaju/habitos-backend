const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importamos JWT
const User = require('./models/User');
const Habit = require('./models/Habit');
const authMiddleware = require('./middleware/auth'); // Importamos el guardia

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('Error:', err));

// REGISTRO
app.post('/api/register', async (req, res) => {
  try {
    const user = new User({ username: req.body.username, password: req.body.password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// LOGIN (Ahora genera un JWT)
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    // Creamos el gafete VIP (Token)
    const token = jwt.sign({ id: user._id }, 'MI_SECRETO_SUPER_SEGURO', { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token: token }); // Enviamos el token al front
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// --- RUTAS PROTEGIDAS CON AUTHMIDDLEWARE ---

// OBTENER HÁBITOS (Solo los del usuario logueado)
app.get('/api/habits', authMiddleware, async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });
  res.json(habits);
});

// CREAR HÁBITO (Punto D - Se enlaza al usuario automáticamente)
app.post('/api/habits', authMiddleware, async (req, res) => {
  const habit = new Habit({ name: req.body.name, user: req.user.id });
  await habit.save();
  res.status(201).json(habit);
});

// MARCAR COMO HECHO
app.post('/api/habits/:id/done', authMiddleware, async (req, res) => {
  try {
    // Buscamos el hábito y nos aseguramos de que sea de este usuario
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) return res.status(404).json({ error: 'Hábito no encontrado' });

    const now = new Date();
    if (!habit.lastCompleted) {
      habit.streak = 1;
    } else {
      const diffTime = Math.abs(now - habit.lastCompleted);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays > 1) habit.streak = 1; 
      else if (diffDays === 1) habit.streak += 1; 
    }
    habit.lastCompleted = now;
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

app.listen(5000, () => console.log('🚀 Servidor Backend en puerto 5000'));