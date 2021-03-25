import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_SOCKET_API, {})
socket.on('connect', function() {})

export default socket
