var models = require('../../models/index');
var iof_setting = require('../../models/iof_setting');

//default inset setting 
exports.DefaultSetting = function(settingInfo, callback) {
    models.iof_setting.create({
        deviceId: settingInfo.id,
        sd_serial: settingInfo.serial,
        sd_address: settingInfo.address,
        water_time: 5,
        camera_time: 30,
        sensing_time: 1
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('default setting error ::::: ', err);
        callback(err, null);
    });
}

exports.InsertSetting = function(setting_info, callback) {
    models.iof_setting.create({
        deviceId: setting_info.id,
        sd_serial: setting_info.serial,
        sd_address: setting_info.address,
        water_time: setting_info.waterTime,
        camera_time: setting_info.cameraTime,
        sensing_time: setting_info.settingTime
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('insert iof setting error ::: ', err);
        callback(err, null);
    });
};

//find iof setting last
exports.FindSetting = function(setting_info, callback) {
    models.iof_setting.findOne({
        where: {
            id_serial: setting_info.serial
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('find setting iof error :::: ', err);
        callback(err, null);
    });
};

//find iof setting histroy
exports.HistorySetting = function(setting_info, callback) {
    models.iof_setting.findAll({
        where: {
            id_serial: setting_info.serial
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('find all iof setting error ::: ', err);
        callback(err, null);
    });
};

//update setting iof value
exports.UpdateSetting = function(setting_info, callback) {
    models.iof_setting.update({

    }, {
        where: {
            sd_serial: setting_info.serial
        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('update setting iof error :::: ', err);
        callback(err, null);
    });
};

//update setting iof value
exports.UpdateWater = function(settingInfo, callback) {
    var nowTime = new Date();
    models.iof_setting.update({
        water_time: settingInfo.waterTime,
        updatedAt: nowTime
    }, {
        where: {
            sd_serial: settingInfo.serial
        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('update water time setting error ::::: ', err);
        callback(err, null);
    });
}

//udpate camera time 
exports.UpdateCamera = function(settingInfo, callback) {
    var nowTime = new Date();
    models.iof_setting.update({
        camera_time: settingInfo.cameraTime,
        updatedAt: nowTime
    }, {
        where: {
            sd_serial: settingInfo.serial
        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('update camera time setting error ::: ', err);
        callback(err, null);
    })
}

//export setting camera value
exports.CameraSetting = function(setting_info, callback) {
    models.iof_setting.create({

    })
}