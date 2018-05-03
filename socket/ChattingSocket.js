var socketio = require('socket.io');
var socketclient = require('socket.io-client')('https://13.209.19.28:5001');

module.exports = function(server) {
    var io = socketio.listen(server);

    //socket listen server connected
    io.sockets.on('connection', function(socket) {

    });
}