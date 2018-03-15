var models = require('../../models/index');
var device = require('../../models/device');
var device_network = require('../../models/device_network');

//testing count
exports.num_device = function(callback) {
    models.device.count({

    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};

//checking device type
/*
exports.get_devicetype = function(data_info, callback) {
    models.device.find({
        attributes: ['device_type'],
        where: {
            device_serial: data_info.type
        }
    }).then((result) => {
        console.log('get device type :::::: ', result);
        callback(null, result);
    }).cratch((err) => {
        console.log('get device type error ::::::: ', err);
        callback(err, null);
    });
}
*/

//group device callback(row, err) models attribute(하나의 속성 값만 가져오는 것), group(속성 값으로 묵어주는 것)로 해결이 가능하다. 더 알아보기 
exports.group_device = function(callback) {
    models.device.findAll({
        attributes: ['device_name'],
        group: ['device_name'],
        where: {

        }
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        console.log('group error : ', err.stack);
        callback(err, null);
    });
}

//insert device 
exports.insert_device = function(device_info, callback) {
    models.device.create({
        device_name: device_info.devivce_name,
        device_apikey: device_info.device_apikey,
        device_serial: device_info.device_serial,
        device_address: device_info.device_address
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find or create device
exports.create_device = function(device_info, callback) {
    models.device.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).then(function(device, created) {
        if (created) {
            callback(null, null, created);
        } else if (device) {
            callback(null, device.dataValues, null);
        } else {
            callback(null, null, null);
        }
    }).catch(function(err) {
        callback(err, null, null);
    });
};

//insert before data
exports.insert_before = function(device_info, callback) {
    models.device.findOne({
        where: {
            device_serial: device_info.apikey
        }
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};

//find detail device
exports.find_device = function(device_info, callback) {
    models.device.find({
        where: {
            device_serial: device_info.apikey,

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find list device
exports.list_device = function(device_info, callback) {
    models.device.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};

//delete device
exports.delete_device = function(device_info, callback) {
    models.device.destroy({
        where: {
            device_serial: device_info.serial
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//update device
exports.update_device = function(device_info, callback) {
    models.device.update({}, {
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//network check device

exports.check_network = function(network_info, callback) {

    models.device.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        var loopIndex = 0;
        for (let device of result) {
            models.device.find({
                include: {
                    model: models.device_network,
                    attributes: ['sn_status'],
                    where: {
                        deviceId: device.id,
                        sn_apikey: device.device_apikey
                    },

                }
            }).then((result2) => {
                console.log(result2.device_network);
                if (result2) {

                    device.device_networks = result2.device_network;

                }
                loopIndex++;
                if (loopIndex === result.length) {
                    //console.log('result :::::::::::::::::::: ', result);
                    //console.log('result network status :::::::::::: ', result.device_network);
                    callback(null, result);
                }
            }).catch((err) => {
                callback(err, null);
            });
        }
    }).catch((err) => {
        callback(err, null);
    });
};


//export data insert check device
exports.check_device = function(device_info, callback) {
    models.device.find({
        where: {
            device_apikey: device_info.apikey
        },

    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};

//export device info check by id
exports.device_info = function(device_info, callback) {
    models.device.find({
        where: {
            id: device_info.id
        }
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};