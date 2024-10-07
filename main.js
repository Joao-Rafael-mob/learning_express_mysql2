const express = require('express')
const app = express()
const port = 3000
const a = require('./db.js')

app.get('/user', (req, res) => {
    res.send('Hello World!')
})

app.post('/user', (req, res) => {
    res.send('Got a POST request')
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
