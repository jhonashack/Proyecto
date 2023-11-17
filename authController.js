// authController.js
const bcrypt = require('bcrypt');
const db = require('./db/dbConfig'); // Reemplaza './dbConfig' con la ruta correcta a tu archivo de configuración de la base de datos

// Función para hashear la contraseña
function hashPassword(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hashSync(plainPassword, saltRounds);
}

// Función para comparar contraseñas
function comparePasswords(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { hashPassword, comparePasswords };
