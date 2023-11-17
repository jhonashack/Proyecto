const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Puede ser 'localhost' si la base de datos está en el mismo servidor
  user: 'root', // El nombre de usuario para acceder a la base de datos
  password: '', // La contraseña para acceder a la base de datos
  database: 'proyecto' // El nombre de la base de datos a la que te quieres conectar (en este caso, 'proyecto')
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

module.exports = connection;
