var express = require('express');
var app = express();
const path = require('path');

const PUERTO = 3000;

app.listen(PUERTO, function(){
    console.log('Servidor http corriendo en el puerto 3000');
});

// Configurar Express para servir archivos estáticos desde la carpeta "assets"
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log('Se recibió una petición get');
});
app.get('/login.html', function(req, res){
    res.sendFile(path.join(__dirname, 'login.html'));
    console.log('Se recibió una petición get');
});
app.get('/register.html', function(req, res){
    res.sendFile(path.join(__dirname, 'register.html'));
    console.log('Se recibió una petición get');
});

// Mover la ruta de manejo de errores 404 después de la ruta para '/'
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});
