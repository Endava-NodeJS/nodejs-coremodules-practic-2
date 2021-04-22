const sqlLight = require("sqlite3")
const {open} = require("sqlite")

const title = "first To Do";
const content = "constent of to do";


(async () => {
    const db = await open({
      filename: 'database.db',
      driver: sqlLight.Database
    })

    await db.exec('CREATE TABLE IF NOT EXISTS todo1 (title TEXT UNIQUE, content TEXT, id INTEGER NOT NULL PRIMARY KEY)')
    // await db.run("INSERT INTO todo1 (title, content) VALUES ('title2', 'content2')")
    const result = await db.all('SELECT * FROM todo1')
    console.log(result)
})()
