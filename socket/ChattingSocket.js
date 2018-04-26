var socketio = require('socket.io');

module.exports = function(server) {
    var io = socketio.listen(server);

    //socket listen server connected
    io.sockets.on('connection', function(socket) {

    });
}