import sio from 'socket.io-client'
import bus from './EventBus'

const { VUE_APP_API_URL, VUE_APP_SOCKETIO_PORT } = process.env

const io = sio(`${VUE_APP_API_URL}:${VUE_APP_SOCKETIO_PORT}`)

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

bus.$on('subscribe', function(rooms) {
  console.log('Subscribe to room: ', rooms)
  io.emit('subscribe', rooms)
})

bus.$on('unsubscribe', function(rooms) {
  console.log('Subscribe to room: ', rooms)
  io.emit('unsubscribe', rooms)
})

bus.$on('user-start-writing', function(user, room) {
  io.emit('user-start-writing', user, room)
})

bus.$on('user-stop-writing', function(user, room) {
  io.emit('user-stop-writing', user, room)
})