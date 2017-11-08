const express = require('express'),
      process = require('process'),
      socketio = require('socket.io');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('name', (name) => {
    console.log(name + ' says Hello!');
    io.emit('name', name);
  });
});
