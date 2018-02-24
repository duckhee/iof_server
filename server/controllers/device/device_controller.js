var models = require('../../models/index');
var device = require('../../models/device');
var device_network = require('../../models/device_network');


//group device callback(row, err) models attribute(하나의 속성 값만 가져오는 것), group(속성 값으로 묵어주는 것)로 해결이 가능하다. 더 알아보기 
exports.group_device = function(callback) {
    models.device.findAll({
        attributes: ['device_name'],
        group: ['device_name'],
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
        ],
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

//device list and status
exports.get_deive = function(device_info, callback) {
    models.device.findAll({
        where: {

        }
    }).then((result) => {
        var loopIndex = 0;
        for (let device_network in result) {
            models.device_network.find({
                include: {
                    model: models.device,
                    where: {

                    }
                },
                attributes: ['sn_status'],
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((result2) => {
                console.log('result 2 get network status');
                if (result2) {
                    console.log('testing result2 : ', result2.device_networks);
                    device.device_networks = result2.device_networks;
                }
                loopIndex++;
                if (loopIndex === result.length) {
                    console.log('testing result : ', result);
                    callback(null, result);
                }
            }).catch((err) => {
                console.log('get status device');
                callback(err, null);
            });
        }
    }).catch((err) => {
        console.log('device network get error : ', err);
        callback(err, null);
    });
};