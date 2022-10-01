const cors = require('cors')
const express = require('express')
const initListener = require('./initListener')

const corsConfigIO = { cors: { origin: ['http://localhost:4020', 'http://localhost:4030'] } }

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, corsConfigIO)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

initListener(io)

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))
