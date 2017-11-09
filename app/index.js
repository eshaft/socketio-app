const express = require('express'),
      process = require('process'),
      socketio = require('socket.io');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

var namespaceHandler = (namespace) => {
    return (socket) => {
        socket.emit('event', 'You joined ' + namespace.name);
        //just resend it
        socket.on('event', (data) => {
            socket.broadcast.emit('event', data);
        });
    };
}

var one = io.of('/namespace1');
var two = io.of('/namespace2');

one.on('connection', namespaceHandler(one));
two.on('connection', namespaceHandler(two));
