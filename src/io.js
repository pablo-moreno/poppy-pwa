import sio from 'socket.io-client'
import bus from './EventBus'

const io = sio('http://localhost:6226')

// Server-emitted events
io.on('user-rooms', function(rooms) {
  console.log('Received user rooms', rooms)
  bus.$emit('user-rooms', rooms)
})

io.on('new-message', function(message) {
  console.log('Received a new message: ', message)
  bus.$emit('new-message', message)
})

io.on('new-user-connected', function() {
  console.log('Connection established')
  bus.$emit('connection')
})

// Client-emitted events
bus.$on('user-connected', function(user) {
  console.log('Request user connection')
  io.emit('ack-user-connected', user)
})

bus.$on('post-message', function(message) {
  console.log('New message posted', message)
  io.emit('post-message', message)
})

bus.$on('subscribe', function(room) {
  console.log('Subscribe to room: ', room)
  io.emit('subscribe', room)
})