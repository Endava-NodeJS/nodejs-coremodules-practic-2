const http = require("http");

const { getParam, endpoints } = require("./controller");

const requestListener = (req, res) => {
  const match = getParam(req.url);
  const param = match.includes('notes') ? null : match
  const path = "/notes";

  if (endpoints.has(path) && !param) {
    endpoints.get(path)[req.method.toLowerCase()](req, res);
  } else if (endpoints.has(`${path}/:id`) && param) {
    req.params = param;

    endpoints.get(`${path}/:id`)[req.method.toLowerCase()](req, res);
  } else {
    res.end("Welcome. To add a note, go to /notes endpoint.");
  }
};

const server = http.createServer(requestListener);

server.listen(8080);
