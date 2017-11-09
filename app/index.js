const express = require('express'),
      process = require('process'),
      socketio = require('socket.io');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

var namespace = io.of('/namespace');

namespace.on('connection', (socket) => {
    namespace.emit('event', 'Connected to Namespace');
    //this is a different namespace
    io.emit('event', 'normal');
});