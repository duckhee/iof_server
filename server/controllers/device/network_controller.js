var models = require('../../models/index');
var device_network = require('../../models/device_network');
var device = require('../../models/device');

//check network
exports.check_network = function(network_info, callback) {
    models.device.findAll({
        where: {
            device_apikey: network_info.apikey
        }
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
                    }
                }
            }).then((result2) => {
                if (result2) {

                    // console.log('result 2 network', result2);

                    device.device_network = result2.device_network;

                }
                loopIndex++;
                if (loopIndex === result.length) {
                    //console.log('get network status and device ::::::::: ', result);
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