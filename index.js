const { v1: uuidv1 } = require('uuid');

const express = require('express')
const path = require('path')

const app = express()

const cors = require('cors')
app.use(cors())

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// serve static folder
app.use(express.static(path.join(__dirname, 'public')))

// API routes
app.use('/api/channels', require('./routes/api/channels'))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`server started on port: ${PORT}`))

const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

io.on('connection', (socket) => {
    console.log('new user connected')
    socket.emit('connection', null);

    socket.on('send-message', message => {
        message = {
            id: uuidv1(),
            ...message
        }
        io.emit('message', message)
    });

    socket.on('disconnect', () => {
        console.log(`disconnected: ${socket.username}`)
    })
})