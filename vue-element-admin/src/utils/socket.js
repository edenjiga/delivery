import io from 'socket.io-client'

const socket = io('http://localhost:8000', {})
socket.on('connect', function() {})

export default socket
