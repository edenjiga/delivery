import io from 'socket.io-client';

const socket = io('https://qa.edgarjimenezg.com', {});
socket.on('connect', function () {
  console.log('connect');
});

socket.on('disconnect', function () {
  console.log('disconnect');
});

export { socket };
