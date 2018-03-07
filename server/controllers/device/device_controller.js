var models = require('../../models/index');
var device = require('../../models/device');
var device_network = require('../../models/device_network');


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
        defualts: {

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

//find detail device
exports.find_device = function(device_info, callback) {
    models.device.find({
        where: {

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
                    // console.log('testing result2 : ', result2.device_network);
                    device.device_networks = result2.device_network;
                    //console.log("///////////////////////////////////////////");
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
        attributes: ['id']
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};