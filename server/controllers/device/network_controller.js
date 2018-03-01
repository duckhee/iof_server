var models = require('../../models/index');
var device_network = require('../../models/device_network');


exports.check_network = function(network_info ,callback) {
    console.log('nework info :::', network_info);
    models.device_network.findAll({
        where: {

        },
        attributes: ['sn_status']
    }).then((result) => {
        console.log('result ::: ',result)
        var loopIndex = 0;
        for (let device of result) {
            models.device.find({
                include: {
                    model: models.device,
                    where:{
                        
                    }
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


exports.test = function(network_info, callback) {
    models.device_network.findAll({
        where:{

        }
    }).then((row) => {
        callback(null, row);
    }).catch(err => {
        callback(err, null);
    })
}