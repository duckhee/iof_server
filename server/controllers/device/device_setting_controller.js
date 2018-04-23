var models = require('../../models/index');
var device_setting = require('../../models/device_setting');


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

 //setting insert callback(err, result)\
 exports.create_setting = function(setting_info, callback){
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

 //insert setting info
 exports.insert_setting = function(setting_info, callback){
     models.device_setting.create({
        st_serial:setting_info.serial,
        deviceId:setting_info.id,
        st_address:setting_info.address,
        st_apikey:setting_info.apikey,
        st_title:setting_info.title,
        st_gps:setting_info.gps,
        st_ping:setting_info.ping,
        st_group:setting_info.group
     }).then((result)=>{

     }).catch((err)=>{

     });
 };

 //update setting info
 exports.update_setting = function(setting_info, callback){
     models.device_setting.update({

     },{
         where:{

         }
     }).then((result)=>{

     }).catch((err)=>{

     });
 }

 //delete setting cllback(err, result)
 exports.delete_setting = function(setting_info, callback){
     models.device_setting.destroy({
         where:{

         }
     }).then((result)=>{

     }).catch((err)=>{

     });
 }

 //find setting value callback(err, result)
exports.find_setting = function(setting_info, callback){
    models.device_setting.find({
        where:{

        }
    }).then((result)=>{

    }).catch((err)=>{

    });
}

//find all setting value callback(err, result)
exports.findAll_setting = function(setting_info, callback){
    models.device_setting.findAll({
        where:{

        }
    }).then((result)=>{

    }).catch((err)=>{

    });
};


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
