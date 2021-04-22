const DB = require('./db');

const db = new DB('./notes.json');
const endpoints = new Map()

endpoints.set('/notes', {
  get: (req, res) => {
    res.end(JSON.stringify(db.get()))
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
      res.end(JSON.stringify(db.get()))
    })
  
    req.on('error', (e) => {
      console.log(e)
    })
  }
})
endpoints.set('/notes/:id', {
  
  get: (req, res) => {
    res.end(JSON.stringify(db.get(req.queryParam)))
  },
  put: (req, res) => {
    let data = ''
    let body
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      body = JSON.parse(data)
      const { title, content } = body
      const id = req.queryParam
      db.update({title, content, id})
      res.end(JSON.stringify(db.get(id)))
    })
  
    req.on('error', (e) => {
      console.log(e)
    })
  },
  delete: (req, res) => {
    db.delete(req.queryParam)
    res.end(JSON.stringify(db.get()))
  },
})
module.exports = {
  endpoints
}