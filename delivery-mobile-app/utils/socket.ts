import io from 'socket.io-client';
import environment from '@/environment';
const socket = io(environment.socketUrl, {});
socket.on('connect', function () {
  console.log('connect');
});

socket.on('disconnect', function () {
  console.log('disconnect');
});

export { socket };
