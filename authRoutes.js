const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db/dbConfig'); // Importa tu conexión a la base de datos

router.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const query = 'SELECT * FROM usuario WHERE correo = ?';
      db.query(query, [username], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          const user = results[0];
          const match = await bcrypt.compare(password, user.clave);

          if (match) {
            req.session.loggedIn = true;
            req.session.user = { id: user.id, username: user.nombre };
            res.redirect('/perfil');
          } else {
            res.send('Credenciales incorrectas');
          }
        } else {
          res.send('Usuario no encontrado');
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  } else {
    res.send('Por favor, introduce nombre de usuario y contraseña');
  }
});

router.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

router.post('/register', async (req, res) => {
  const { username, email, age, password } = req.body;

  if (username && email && age && password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO usuario (nombre, correo, edad, clave) VALUES (?, ?, ?, ?)';
      db.query(query, [username, email, age, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          res.status(500).send('Error al registrar usuario');
          return;
        }
        res.send('Usuario registrado exitosamente');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  } else {
    res.send('Por favor, completa todos los campos');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

// Ruta para mostrar el perfil del usuario
router.get('/perfil', (req, res) => {
    const userId = req.session.user.id; // Obtén el ID del usuario de la sesión

    // Realiza una consulta a la base de datos para obtener la información del usuario
    db.query('SELECT * FROM usuario WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener el perfil del usuario');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        const user = results[0];
        // Renderiza la plantilla del perfil del usuario pasando la información del usuario
        res.render('perfil', { user });
    });
});

module.exports = router;
