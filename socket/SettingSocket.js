var SettingController = require('../server/controllers/device/device_setting_controller');
var IoFSettingController = require('../server/controllers/device/IoF_Setting_controller');
var RadonSettingController = require('../server/controllers/device/radon_Setting_controller');
var DeviceController = require('../server/controllers/device/device_controller');
var DeviceSettingController = require('../server/controllers/device/device_setting_controller');
//util
var Util = require('../server/util/util');

//socket start
module.exports = function(io, socket) {
    //set device setting 
    socket.on('web_device_setting_request', function(data) {
            console.log('web setting device', data);
            var DeviceChecking = {
                "serial": data.serial
            }
            DeviceController.insert_before(data, function(result) {
                if (err) {
                    console.log('checking device error before setting :::::', err);
                } else if (result) {
                    console.log('find device before setting ::::', result);
                    if (!Util.isEmpty(result)) {
                        if (result.device_type === 'IoF') {
                            var IoFSettingValue = {
                                "deviceId": result.id,
                                "sd_serial": result.device_serial,
                                "sd_address": data.address,
                                "water_time": data.waterTime,
                                "camera_time": data.cameraTime,
                                "sensing_time": data.sensingTime
                            }
                            IoFSettingController.InsertSetting(IoFSettingValue, function(err, result) {
                                if (err) {
                                    console.log('insert iof setting socket error ::: ', err);
                                } else if (result) {
                                    var SendSetting = {
                                        "waterTime": data.waterTime,
                                        "cameraTime": data.cameraTime,
                                        "sensingTime": data.sensingTime
                                    }
                                    io.emit('send_device_setting_web_' + result.device_serial, SendSetting);
                                } else {
                                    console.log('insert setting null');
                                }
                            });
                        } else if (result.device_type === 'radon') {
                            var RadonSetting = {

                            }
                        } else {
                            console.log('can not found device type');
                        }
                    }
                    //checking null end
                }
            });
            //insert before end
        })
        //checking device setting
    socket.on('device_setting_request', function(data) {
        console.log('device setting before check device :::', data);
        var deviceInfo = {};
        DeviceController.insert_before(deviceInfo, function(err, result) {
            if (err) {
                console.log('checking device error before setting ::::: ', err);
            } else if (result) {
                if (!Util.isEmpty(result)) {
                    if (result.device_type === 'IoF') {
                        //iof setting how to ??


                    } else if (result.device_type === 'radon') {
                        //radon setting how to ??
                    }
                } else {

                }
            } else {
                console.log('not device info null ');
            }
        });
        //insert before function end
    });
}