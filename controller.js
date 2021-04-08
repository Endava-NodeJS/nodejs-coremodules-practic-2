const DB = require("./db");

const db = new DB("./notes.json");
const endpoints = new Map();

const getParam = (url) => {
  return url.match(/([a-zA-Z0-9]*)$/);
};

endpoints.set("/notes", {
  get: (req, res) => {
    console.log(db.get());
    res.end(JSON.stringify(db.get()));
  },
  post: (req, res) => {
    let data = "";
    let body;

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        body = JSON.parse(data);
        const { title, content } = body;

        db.add({ title, content });
        res.end("Successfully added");
      } catch (e) {
        console.log(e);
        res.writeHead(500);
      }
    });

    req.on("error", (e) => {
      console.log(e);
    });
  },
});

endpoints.set(`/notes/:id`, {
  get: (req, res) => {
    res.end(JSON.stringify(db.get(req.params[0])));
  },
  put: (req, res) => {
    let data = "";
    let body;

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      body = JSON.parse(data);

      const { title, content } = body;
      const param = req.params[0];

      try {
        if (!content) {
          db.update({ id: param, title });
        } else if (!title) {
          db.update({ id: param, content });
        } else {
          db.update({ id: req.params[0], title, content });
        }

        res.end("Successfully updated");
      } catch (e) {
        res.writeHead(500);
      }
    });

    req.on("error", (e) => {
      console.log(e);
    });
  },
  delete: (req, res) => {
    try {
      db.delete(req.params[0]);
      res.end("Successfully deleted");
    } catch (e) {
      console.log(e);
      res.writeHead(500);
    }
  },
});

module.exports = {
  endpoints,
  getParam,
};
