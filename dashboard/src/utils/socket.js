import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_SOCKET_API, {})
socket.on('connect', function() {
  console.log('connected')
})

socket.on('disconnect', function() {
  console.log('Disconnected')
})

export default socket
