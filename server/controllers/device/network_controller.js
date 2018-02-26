var models = require('../../models/index');
var device_network = require('../../models/device_network');


exports.check_network = function(callback) {
    models.device_network.findAll({
        where: {

        },
        attributes: ['sn_status']
    }).then((result) => {
        var loopIndex = 0;
        for (device in result) {
            models.device_network.find({
                include: {
                    model: models.device,
                    key: device_network.sn_serial
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((result2) => {
                if (result2 === result2.devices) {
                    device_network.devices = result2.devices;
                }
                loopIndex++;
                if (loopIndex === result.length) {
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


exports.test = function(callback) {
    models.device_network.findAll({
        include: { model: models.device, }
    }).then((row) => {
        callback(null, row);
    }).catch(err => {
        callback(err, null);
    })
}