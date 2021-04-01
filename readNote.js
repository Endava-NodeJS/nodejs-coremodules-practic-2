const notes = require("./notes.js");

const title = process.argv[2];

if (title) {
  notes.readNote(title);
} else {
  const message = !notes.getData().length ? 'No notes yet' : notes.getData();

  console.log(message);
}
