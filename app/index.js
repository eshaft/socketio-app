const express = require('express'),
      process = require('process'),
      socketio = require('socket.io');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('socketping', () => {
    console.log('Received socketping, sending socketpong');
    socket.emit('socketpong');
  });
});
