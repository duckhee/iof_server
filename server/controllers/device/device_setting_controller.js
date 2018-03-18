var models = require('../../models/index');
var device_setting = require('../../models/device_setting');




//group device callback(row, err) models attribute(하나의 속성 값만 가져오는 것), group(속성 값으로 묵어주는 것)로 해결이 가능하다. 더 알아보기 
exports.group_device = function(callback) {
    models.device_setting.findAll({
        attributes: ['st_serial'],
        group: ['st_serial'],
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        console.log('group error : ', err.stack);
        callback(err, null);
    });
}

//group device
exports.grouping_device = function(device_info, callback) {
    models.device_setting.findAll({
        attributes: ['st_serial'],
        group: ['st_serial'],
        where: {
            st_apikey: device_info.apikey
        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('grouping error ::::::: ', err);
        callback(err, null);
    });
};

//export device setting save
exports.setting_device = function(device_info, callback) {
    models.device_setting.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).spread((result, created) => {
        if (created) {
            console.log('test created : ', created);
            callback(null, null, created);
        } else {
            console.log(result);
            callback(null, result.dataValues, null);
        }
    }).catch((err) => {
        console.log('setting device find or created error :::::::::: ', err);
        callback(err, null, null);
    })
};