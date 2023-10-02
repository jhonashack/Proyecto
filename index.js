const http = require ("http")

const fs = require("fs");//

const host = "localhost"
const port = 8000

const requestListener = function (req, res) {
    // Lee el contenido de 'index.html' de manera asíncrona.
    fs.readFile("index.html", "utf8", (err, data) => {
      if (err) {
        // Maneja el error si no se puede leer el archivo.
        res.writeHead(404);
        res.
       
  end("Error: Página no encontrada problem");
      } else {
        // Si se pudo leer el archivo, envía su contenido como respuesta.
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  };
  
  
      
const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log("Node.js está funcionando en el puerto 8000");
  });

