const DB = require('./db');

const db = new DB('./notes.json');


const http = require('http');
const { endpoints } = require('./controller')
const url = require('url');
const querystring = require('querystring');

const requestListener = function (req, res) {
    const urlInfo = querystring.parse(req.url, '?')
    const urlParams = Object.keys(urlInfo)
    try{
      if (endpoints.has(req.url)) {
      endpoints.get(req.url)[req.method.toLowerCase()](req, res)
      }

      else if (endpoints.has(`${urlParams[0]}:${urlParams[1]}`)) {
      req.queryParam = urlInfo.id
      endpoints.get(`${urlParams[0]}:${urlParams[1]}`)[req.method.toLowerCase()](req, res)
      }
      else 
      res.end('page not found');
    }
    catch(e){res.end(e.message);}
  

}  

const server = http.createServer(requestListener);
server.listen(8080);
