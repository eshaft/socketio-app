const express = require('express'),
      process = require('process'),
      socketio = require('socket.io'),
      router = require('./routes.js'),
      sockets = require('./sockets.js');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

//setup express to use middleware
app.use('/', router);

var bears = io.of('/bears');
var cubs = io.of('/cubs');
bears.on('connection', sockets.bearsNamespace);
cubs.on('connection', sockets.cubsNamespace);

io.on('connection', (socket) => {
    //we need specific events for each
    //cubs and bears
});
