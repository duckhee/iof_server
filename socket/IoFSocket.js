var deviceController = require('../server/controllers/device/device_controller');
var IoFValueController = require('../server/controllers/device/iof_controller');
var network_controller = require('../server/controllers/device/network_controller');


module.exports = function(socket) {
    //insert iof device setting
    socket.on('iof_device_setting_request', function(data) {
        console.log('iof device setting request ::::::::::: ', data);
        var serialInfo = { "serial": data.serial };
        deviceController.find_device(serialInfo, function(err, result) {
            if (err) {
                console.log('device setting error :::: ', err);
                var errorSetting = {};
                io.emit('iof_device_setting_error', errorSetting);
            } else {
                if (data.msg === 0) {

                } else if (data.msg === 1) {

                }
            }
        })
    });
    //save sensor info
    socket.on('sensor_iofdata_request', function(data) {
        console.log('socket ::::: ' + data);
        deviceController.insert_before(data.info, function(err, result) {
            if (err) {
                console.log('insert before checking device error ::::::', err);
            } else if (result) {
                console.log('device checking success !');
                console.log('socket data insert before :::::::: ', result.device_apikey);
                var insertValue = {
                    "serial": data.info.serial,
                    "apikey": result.device_apikey,
                    "device_id": result.id,
                    "sd_address": data.info.sd_address,
                    "value": data.info.value,
                };
                IoFValueController.InsertValue(insertValue, function(err, result) {
                    if (result) {
                        io.emit('sensor_iofdata_receive_' + data.serial, { msg: 1 });
                        network_controller.update_actstatus(data.info, function(err, result) {
                            if (err) {
                                console.log('updateing active network error ::::: ', err);
                            } else {
                                console.log('success updating network set ::::: ', result);
                            }
                        });
                    } else if (err) {
                        console.log('socket iof data insert error :::::: ', err);
                    } else {
                        console.log('null insert device');
                    }
                });
            } else {
                console.log('not device ');
            }
        });
    });

    socket.on('sensor_array_iofdata_request', function(data) {
        console.log('socket arr :::::::: ', data);
        deviceController.insert_before(data, function(err, result) {
            if (err) {
                console.log('insert before checking device error ::::::', err);
            } else if (result) {
                IoFValueController.BulkInsert(data, function(err, result) {
                    if (result) {
                        io.emit('sensor_data_receive_' + data[0].sd_serial, { msg: 1 });
                        IoFValueController.delete_reduplication_data(function(err) {
                            if (err) {
                                console.log('app delete reduplication error ::::::::::::: ', err);
                            } else {
                                console.log('null delete data');
                            }
                        });
                    } else if (err) {
                        console.log('insert array data request insert error :::::::::::: ', err);
                    } else {
                        console.log('null data ');
                    }
                });
            } else {
                console.log('null insert device');
            }
        });
    });
}