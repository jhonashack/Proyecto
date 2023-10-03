var express = require('express');
var app = express();
const path = require('path'); // Import the 'path' module

const PUERTO = 8000;

app.listen(PUERTO, function(){
	console.log('Servidor http correindo en el puerto 8000');
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
	console.log('Se recibio una petición get');
});

app.use(express.static(__dirname + "/public"));

app.get("/contacto", (req, res) => {
	res.send("ruta de contacto 1");
  });
  app.get("/admin", (req, res) => {
	res.send("ruta de administracion 1");
  });
  app.use((req, res, next) => {
	// res.status(404).send("Sorry cant find that!");
	res.status(404).sendFile(__dirname + "/public/404.html");
  });
  app.get('/public', (req, res) => {
    res.sendFile(path.join(__dirname, '404.html'));
});