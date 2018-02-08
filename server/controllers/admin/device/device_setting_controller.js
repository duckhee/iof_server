var models = require('../../../models/index');
var device_setting = require('../../../models/device_setting');




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