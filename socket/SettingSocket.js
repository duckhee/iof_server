var SettingController = require('../server/controllers/device/device_setting_controller');
var IoFController = require('../server/controllers/device/IoF_Setting_controller');
var RadonController = require('../server/controllers/device/radon_Setting_controller');
var DeviceController = require('../server/controllers/device/device_controller');
var DeviceSettingController = require('../server/controllers/device/device_setting_controller');
//util
var Util = require('../server/util/util');

//socket start
module.exports = function(io, socket) {
    socket.on('device_setting_request', function(data) {
        console.log('device setting before check device :::', data);
        var deviceInfo = {};
        DeviceController.insert_before(deviceInfo, function(err, result) {
            if (err) {
                console.log('checking device error before setting ::::: ', err);
            } else if (result) {
                if (!Util.isEmpty(result)) {

                } else {

                }
            } else {
                console.log('not device info null ');
            }
        });
        //insert before function end
    });
}