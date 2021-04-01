const notes = require("./notes.js");

let titles = [];

for (let i = 2; i < process.argv.length; i++) {
  titles.push(process.argv[i]);
}

notes.deleteNote(titles);
