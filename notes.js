const fs = require("fs");

const getData = () => {
  try {
    const dataBuffer = fs.readFileSync('./mock-data.json');
    const string = dataBuffer.toString()

    return JSON.parse(string)

  } catch (err) {
    console.log("🚀 ~ file: notes.js ~ line 10 ~ getData ~ err", err)

    return ''
  }

}

const readNote = (title) => {
  const data = getData();

  const note = data.find(el => el.title === title)

  if (note) {
    console.log(note.content)
  } else {
    console.log('No note found');
  }
}

// console.log("🚀 ~ file: notes.js ~ line 4 ~ data", getData())

module.exports = {
  getData: getData,
  readNote: readNote,
}