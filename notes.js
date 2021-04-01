// to execute any functions, start the needed file with the required arguments
// ex:
// node addNote.js 'to do:' 'learn nodejs'     (first goes the title, then the content)
// node deleteNote.js 'to do:' 'some other title'     (one title or more allowed)
// node editNote.js 'to do:' 'learn nodejs, play guitar, annoy the neighbors'
// node readNode.js (will return all the notes)
// node readNode.js 'to do:' (will return content of 'to do:')


const fs = require("fs");

const getData = () => {
  try {
    return JSON.parse(fs.readFileSync("./mock-data.json"));
  } catch (err) {
    console.log("Error:", err);
  }
};

const getNote = (title) => {
  const data = getData();
  const found = data.find((el) => el.title === title);

  if (found) {
    return found;
  }
};

const readNote = (title) => {
  const note = getNote(title);

  if (note) {
    console.log(note.content);

    return note.content;
  } else {
    console.log("No note found. Please check the title.");
  }
};

const deleteNote = (titles) => {
  let data = getData();

  titles.map((title) => {
    data = data.filter((el) => el.title !== title);
  });

  fs.writeFileSync("./mock-data.json", JSON.stringify(data));

  console.log("Updated list:", getData());
};

const editNote = (title, content) => {
  const note = getNote(title);
  const notes = getData();

  const ID = notes.findIndex((obj) => obj.title === title);

  if (ID < 0) {
    console.log("No notes were found to update. Please check the title.");
  } else {
    const newNote = { ...note, content };
    notes[ID] = newNote;

    fs.writeFileSync("./mock-data.json", JSON.stringify(notes));

    console.log("Updated list:", getData());
  }
};

const addNote = (title, content) => {
  if (title && content) {
    const notes = getData();

    fs.writeFileSync(
      "./mock-data.json",
      JSON.stringify([...notes, { title, content }])
    );

    console.log("Updated list:", getData());
  } else {
    console.log("Please provide a title and a content");
  }
};

module.exports = {
  getData,
  readNote,
  editNote,
  deleteNote,
  addNote,
};
