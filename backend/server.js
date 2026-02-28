require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite a Express entender JSON

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas exitosamente'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas
app.use('/api/habits', habitRoutes);

// Arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});