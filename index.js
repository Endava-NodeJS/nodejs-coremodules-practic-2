const DB = require('./db');

const db = new DB('./notes.json');


const http = require('http');
const { endpoints } = require('./controller')

console.log(db.get());

const requestListener = function (req, res) {
    if (endpoints.has(req.url)) {
      endpoints.get(req.url)[req.method.toLowerCase()](req, res)
    }

    res.writeHead(200);
    console.log("🚀 ~ file: index.js ~ line 17 ~ requestListener ~ res", res)
    res.end('Hello world');
}

const server = http.createServer(requestListener);
server.listen(8080);
