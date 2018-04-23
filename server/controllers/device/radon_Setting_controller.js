var models = require('../../models/index');
var radon_setting = require('../../models/radon_setting');

//insert radon setting 
exports.Insert = function(setting_info, callback){
    models.radon_setting.create({
        deviceId:setting_info.id,
        sr_serial:setting_info.serial,
        sr_address:setting_info.address,
        sensing_time:setting_info.sensingTime
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('radon setting insert error ::::: ', err);
        callback(err, null);
    });
};

//find radon setting 
exports.FindSetting = function(setting_info, callback){
    models.radon_setting.findOne({
        where:{
            sr_serial:setting_info.serial
        },
        order:[
            ['createdAt', 'DESC']
        ]
    }).then((result)=>{
        clalback(null, result);
    }).catch((err)=>{
        console.log('find radon setting error :::: ', err);
        callback(err, null);
    });
};

//find radon setting all
exports.HistorySetting = function(setting_info, callback){
    models.radon_setting.findAll({
        where:{
            sr_serial:setting_info.serial
        },
        order:[
            ['createdAt', 'DESC']
        ]
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('history radon setting error :::: ', err);
        callback(err, null);
    });
};

//update radon setting 
exports.UpdateSetting = function(setting_info, callback){
    models.radon_setting.update({

    },{
        where:{
            sr_serial:setting_info.serial
        }
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('update radon setting error :::: ', err);
        callback(err, null);
    });
};