var models = require('../../models/index');
var iof_setting = require('../../models/iof_setting');

exports.InsertSetting = function(setting_info, callback){
    models.iof_setting.create({
        deviceId:setting_info.id,
        sd_serial:setting_info.serial,
        sd_address:setting_info.address,
        water_time:setting_info.waterTime,
        camera_time:setting_info.cameraTime,
        sensing_time:setting_info.settingTime
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('insert iof setting error ::: ', err);
        callback(err, null);
    });
};

//find iof setting last
exports.FindSetting = function(setting_info, callback){
    models.iof_setting.findOne({
        where:{
            id_serial:setting_info.serial
        },
        order:[
            ['creaetedAt', 'DESC']
        ]
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('find setting iof error :::: ', err);
        callback(err, null);
    });
};

//find iof setting histroy
exports.HistorySetting = function(setting_info, callback){
    models.iof_setting.findAll({
        where:{
            id_serial:setting_info.serial
        },
        order:[
            ['createdAt', 'DESC']
        ]
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('find all iof setting error ::: ', err);
        callback(err, null);
    });
};

//update setting iof value
exports.UpdateSetting = function(setting_info, callback){
    models.iof_setting.update({
        
    },{
        where:{
            sd_serial:setting_info.serial
        }
    }).then((result)=>{
        callback(null, result);
    }).catch((err)=>{
        console.log('update setting iof error :::: ', err);
        callback(err, null);
    });
};