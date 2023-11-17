const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./authRoutes'); // Importa el módulo de inicio de sesión
const authController = require('./authController'); // Reemplaza './authController' con la ruta correcta a tu controlador de autenticación

const app = express();
const PUERTO = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mi-secreto', // Cambia 'mi-secreto' por una cadena secreta más segura
    resave: false,
    saveUninitialized: true
}));

app.listen(PUERTO, function() {
  console.log('Servidor http corriendo en el puerto 3000');
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log('Se recibió una petición get');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
app.get('/index.html', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log('Se recibió una petición get');
});
app.get('/agregar_resena.html', function(req, res){
  res.sendFile(path.join(__dirname, 'agregar_resena.html'));
  console.log('Se recibió una petición get');
});
app.get('/agregar_cine.html', function(req, res){
  res.sendFile(path.join(__dirname, 'agregar_cine.html'));
  console.log('Se recibió una petición get');
});
app.get('/login.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'login.html'));
  console.log('Se recibió una petición get');
});
app.get('/register.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'register.html'));
  console.log('Se recibió una petición get');
});
app.get('/resenas.html', function(req, res){
  res.sendFile(path.join(__dirname, 'resenas.html'));
  console.log('Se recibió una petición get');
});
app.get('/cinemas.html', function(req, res){
  res.sendFile(path.join(__dirname, 'cinemas.html'));
  console.log('Se recibió una petición get');
});
app.get('/about.html', function(req, res){
  res.sendFile(path.join(__dirname, 'about.html'));
  console.log('Se recibió una petición get');
});
  

// Rutas de autenticación
app.use('/', authRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});
