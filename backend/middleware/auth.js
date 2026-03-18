const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Leer el token que viene desde el frontend
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Acceso denegado. No hay token.' });

  // 2. Extraer el token (viene como "Bearer eyJhb...")
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado. Formato de token inválido.' });

  try {
    // 3. Verificar que el token sea válido con nuestra palabra secreta
    const verificado = jwt.verify(token, 'MI_SECRETO_SUPER_SEGURO');
    req.user = verificado; // Guardamos los datos del usuario en la petición
    next(); // Le decimos que puede pasar a la ruta
  } catch (error) {
    res.status(400).json({ error: 'Token no válido.' });
  }
};