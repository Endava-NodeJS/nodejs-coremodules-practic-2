// const DB = require('./db');
// const db = new DB('./notes.json');
const http = require('http');
// console.log(db.get());

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello world');
}

const server = http.createServer(requestListener);
server.listen(8080);
