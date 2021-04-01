const notes = require("./notes.js");

const title = process.argv[2];
const content = process.argv[3];

notes.addNote(title, content);