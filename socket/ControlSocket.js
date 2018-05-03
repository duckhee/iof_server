var DeviceController = require('../server/controllers/device/device_controller');


module.exports = function(io, socket) {

    /*
    socket.on('finshpumpon_tesitng', function(data){
        console.log('get data :::::: ', data.serial);
        io.emit('testingsocket', 125334);
    });
    */

    //socket water start
    socket.on('waterstart', function(data) {
        console.log('water start ::::::::::: ', data);
        var Info = {
            "serial": data.serial,
            "cmd": data.cmd
        };
        DeviceController.insert_before(Info, function(err, result) {
            if (err) {
                console.log('device before error :::: ', err);
            } else {
                console.log('find device result ::: ', result);
                var ControlInfo = {
                    "serial": result.device_serial,
                    "cmd": data.cmd
                };
                io.emit('pumpstart_' + result.device_serial, ControlInfo);
            }
        });
    });

    //socket water stop
    socket.on('waterstop', function(data) {
        console.log('water end :::: ', data);
        var Info = {
            "serial": data.serial,
            "cmd": data.cmd
        };
        DeviceController.insert_before(Info, function(err, result) {
            if (err) {
                console.log('device before error :::: ', err);
            } else {
                console.log('find devcie result ::: ', result);
                var ControlInfo = {
                    "serial": result.device_serial,
                    "cmd": data.cmd
                };
                io.emit('pumpstop_' + result.device_serial, ControlInfo);
            }
        });
    });

    //socket camera shoot
    socket.on('camerashoot', function(data) {
        console.log('camera shooting data :: ', data);
        console.log('camera command ::: ', data.cmd);
        var Info = {
            "serial": data.serial,
            "cmd": data.cmd
        }
        DeviceController.insert_before(Info, function(err, result) {
            if (err) {
                console.log('device before error ::::: ', err);
            } else {
                console.log('find device result ::: ', result);
                var ShootingInfo = {
                    "serial": result.device_serial,
                    "cmd": data.cmd
                };
                io.emit('shooting_' + result.device_serial, ShootingInfo);
            }
        });

    });
};