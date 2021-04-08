const fs = require('fs');
const crypto = require('crypto');

/**
 * It can write/read/update/delete notes from file with provided filename.
 */
class DB {
  constructor(filePath) {
    if (!filePath) {
      throw new Error('Relative file path should be provided.');
    }

    this.file = filePath;
  }

  readSafeFile() {
    try {
      return this.parseSafeJSON(fs.readFileSync(this.file));
    } catch (e) {
      console.error(`Cannot read file. Reason: `, e.message);

      return [];
    }
  }

  writeSafeFile(data) {
    if (!data) {
      console.error('[WRITE FILE] Empty data provided.');

      return null;
    }

    try {
      fs.writeFileSync(this.file, JSON.stringify(data), { encoding: 'utf8' });

      return data;
    } catch (e) {
      console.error(`Cannot write file. Reason: `, e.message);

      return null;
    }
  }

  parseSafeJSON(content) {
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error('Wrong JSON format.');

      return [];
    }
  }

  /**
   * It will add new note, automatically generating new "id"
   *
   * @example db.add({ title: 'new', content: 'new content' })
   * @param {Note} note
   */
  add(note) {
    if (!note?.title || !note?.content) {
      console.error('Note should contain "title" and "content" fields.');

      return null;
    }

    const notesDb = this.readSafeFile();

    if (!notesDb.find(({ title }) => title === note.title)) {
      const updatedDb = [
        {
          ...note,
          id: crypto.randomBytes(16).toString("hex"),
        },
        ...notesDb,
      ];

      this.writeSafeFile(updatedDb);

      console.log('[ADD] DB successfully updated');
    } else {
      console.error(`[ADD] Note with title: "${note.title}" already exists.`);
    }
  }

  /**
   * Returns notes by id
   *
   * @example db.get() // [{ id: 'some is', title: 'new', content: 'new content' }] // returns all notes
   * @example db.get('some id') // { id: 'some is', title: 'new', content: 'new content' } // returns note with id equal to 'some id'
   * @param {string} id
   * @returns Note[] | Note
   */
  get(id) {
    const notes = this.readSafeFile();

    if (!id) {
      return notes;
    } else {
      return notes.find(({ id: noteId }) => noteId === id);
    }
  }

  /**
   * Deletes note by id
   *
   * @example db.delete('some id') // Removes note with id: 'some id'
   * @param {string} id
   * @returns void
   */
  delete(id) {
    if (!id) {
      console.error('[DELETE] Title should be provided.');
    } else {
      const notes = this.readSafeFile();

      this.writeSafeFile(notes.filter(({ id: noteId }) => noteId !== id));
    }
  }

  /**
   * Updates note by id
   *
   * @example db.update({ id: 'some id', title: 'Another title' }) // title or content fields are optional but one of them should be provided
   * @param {Note} note
   * @returns UpdatedNote | null
   */
  update(note) {
    console.log('note', note)
    if (!note?.title && !note?.content) {
      console.error('[UPDATE] "title" or "content" should be provided.');
    } else {
      const notes = this.readSafeFile();
      const updatedNotes = notes.map((dbNote) => {
        if (dbNote.id === note.id) {
          return {
            ...dbNote,
            ...note,
          }
        }
        return dbNote;
      });

      return this.writeSafeFile(updatedNotes);
    }
  }
}

module.exports = DB;
