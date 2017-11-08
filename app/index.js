const express = require('express'),
      process = require('process'),
      socketio = require('socket.io');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.broadcast.emit('user.events', 'Someone has joined!');
  socket.on('name', (name) => {
      console.log(name + ' says Hello!');
      socket.broadcast.emit('name', name);
  });
});
