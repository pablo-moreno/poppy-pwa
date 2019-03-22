import sio from 'socket.io-client'
import bus from './EventBus'

const io = sio('http://localhost:6226')

// Server-emitted events
io.on('user-rooms', function(rooms) {
  console.log('User rooms: ', rooms)
  bus.$emit('user-rooms', rooms)
})

io.on('new-message', function(message) {
  console.log('received new message: ', message)
  bus.$emit('new-message', 'my-room-1', message)
})

// Client-emitted events
bus.$on('user-connected', function(user) {
  console.log('bus emitted user-connected')
  io.emit('ack-user-connected', user)
})

bus.$on('post-message', function(message) {
  console.log('bus emitted post-message', message)
  io.emit('post-message', 'my-room-1', message)
})
