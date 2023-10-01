const http = require ("http")
const host = "localhost"
const port = 8000

const requestListener = function (req, res){

    res.writeHead(200);
    res.end("mi primer serividor web con node.js");

};
const server = http.createServer(requestListener);
server.listen(port, host ,()=> {

    console.log('node.js esta funcionando en el puerto 8000');


});