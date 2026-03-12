const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Habit = require('./models/Habit');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/habitosDB')
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error:', err));

app.post('/api/register', async (req, res) => {
  try {
    const user = new User({ username: req.body.username, password: req.body.password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    // 👇 CAMBIAMOS ESTA LÍNEA PARA VER EL ERROR REAL 👇
    res.status(400).json({ error: error.message }); 
  }
});

app.post('/api/login', async (req, res) => {
const user = await User.findOne({ username: req.body.username });
if (user && await bcrypt.compare(req.body.password, user.password)) {
res.json({ message: 'Login exitoso', userId: user._id });
} else {
res.status(401).json({ error: 'Credenciales inválidas' });
}
});

app.get('/api/habits', async (req, res) => {
const habits = await Habit.find();
res.json(habits);
});

app.post('/api/habits', async (req, res) => {
const habit = new Habit({ name: req.body.name });
await habit.save();
res.status(201).json(habit);
});

app.post('/api/habits/:id/done', async (req, res) => {
try {
const habit = await Habit.findById(req.params.id);
const now = new Date();

if (!habit.lastCompleted) {
  habit.streak = 1;
} else {
  const diffTime = Math.abs(now - habit.lastCompleted);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

  if (diffDays > 1) { 
    habit.streak = 1; 
  } else if (diffDays === 1) {
    habit.streak += 1; 
  }
}

habit.lastCompleted = now;
await habit.save();
res.json(habit);
} catch (error) {
res.status(500).json({ error: 'Error al actualizar' });
}
});

app.listen(5000, () => console.log('Backend en puerto 5000'));