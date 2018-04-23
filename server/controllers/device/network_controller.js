import { isDate } from 'util';

var models = require('../../models/index');
var device_network = require('../../models/device_network');
var device = require('../../models/device');
var util_make = require('../../util/util');


//report checking network
exports.checking = function(callback){
    models.device_network.findAll({
        
        order:[
            ['createdAt','DESC']
        ]
    }).then((result)=>{
        console.log('testing ::::: ', result);
        callback(null, result);
    }).catch((err)=>{
        console.log('error ::::: ', err);
        callback(err, null);
    });
};


//report checking network admin or user
exports.checking_connection_admin = function(callback) {
    models.device.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        if (util_make.isEmpty(result) == true) {
            console.log(util_make.isEmpty(result));
            callback(null, null);
        }
        var loopIndex = 0;
        for (let device of result) {
            models.device.find({
                include: {
                    model: models.device_network,
                    attributes: ['sn_status'],
                    where: {
                        deviceId: device.id
                    }
                }
            }).then((result2) => {
                if (result2) {
                    device.device_network = result2.device_network;
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


//check network
exports.check_network = function(network_info, callback) {
    models.device.findAll({
        where: {
            device_apikey: network_info.apikey
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        console.log('testing ::::: ', result);
        if (util_make.isEmpty(result) == true) {
            console.log(util_make.isEmpty(result));
            callback(null, null);
        }
        var loopIndex = 0;
        for (let device of result) {
            models.device.find({
                include: {
                    model: models.device_network,
                    attributes: ['sn_status'],
                    where: {
                        deviceId: device.id,
                        sn_apikey: device.device_apikey
                    },

                }
            }).then((result2) => {
                if (result2) {
                    // console.log('result 2 network', result2);
                    device.device_network = result2.device_network;
                }
                loopIndex++;
                if (loopIndex === result.length) {
                    //console.log('get network status and device ::::::::: ', result);
                    callback(null, result);
                }
            }).catch((err) => {
                console.log('find and update error network error :::::::: ', err);
                callback(err, null);
            });
        }
    }).catch((err) => {
        console.log('find and update2 error network error :::::::: ', err);
        callback(err, null);
    });
};

//export update status
exports.update_inactstatus = function(network_info, callback) {
    var nowTime = new Date();
    models.device.find({
        //device_serial: network_info.serial
        where:{
            device_serial: network_info.serial
        }
    }).then((result) => {
        models.device_network.update({
            updatedAt:nowTime,
            sn_status: 'inactive'
        }, {
            where: {
                sn_serial: network_info.serial
            }
        }).then((result2) => {
            callback(null, result2);
        }).catch((err) => {
            callback(err, null);
        });
    }).catch((err) => {
        callback(err, null);
    });
};

//export update status
exports.update_actstatus = function(network_info, callback) {
    var nowTime = new isDate();
    models.device.find({
        where:{
            device_serial: network_info.serial
        }
        //device_serial: network_info.serial
    }).then((result) => {
        models.device_network.update({
            updatedAt:nowTime,
            sn_status: 'active'
        }, {
            where: {
                sn_serial: network_info.serial
            }
        }).then((result2) => {
            callback(null, result2);
        }).catch((err) => {
            callback(err, null);
        });
    }).catch((err) => {
        callback(err, null);
    });
};

//create network info 
exports.insert_network = function(network_info, callback) {
    models.device_network.create({
        sn_type: '',
        sn_address: network_info.device_address,
        sn_serial: network_info.device_serial,
        deviceId: network_info.id,
        sn_apikey: network_info.device_apikey
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        console.log('craete network table error ::::: ', err);
        callback(err, null);
    });
};