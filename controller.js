const DB = require('./db');

const db = new DB('./notes.json');

const endpoints = new Map()

endpoints.set('/notes', {
  get: (req, res) => {
    console.log(db.get())
    res.write(JSON.stringify(db.get()))
  },
  post: (req, res) => {
    let data = ''
    let body
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      body = JSON.parse(data)
      const { title, content } = body

      db.add({title, content})
      res.write('Successfully added')
    })
  
    req.on('error', (e) => {
      console.log(e)
    })
  }
})

module.exports = {
  endpoints
}